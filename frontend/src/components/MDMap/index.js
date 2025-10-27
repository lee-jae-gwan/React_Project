import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import { defaults as defaultControls } from "ol/control";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

export default function MyMap() {
  const mapRef = useRef();
  const mapInstance = useRef();

  // 지도 센터 좌표 상태
  const [coords, setCoords] = useState({
    lon: 126.978,
    lat: 37.5665,
  });

  // input에서 수정 중인 좌표 상태
  const [inputCoords, setInputCoords] = useState({ lon: 126.978, lat: 37.5665 });

  // input 수정 중인지 여부
  const [editing, setEditing] = useState(false);
  const editingRef = useRef(editing);

  // editing 상태를 ref에 항상 최신값으로 반영
  useEffect(() => {
    editingRef.current = editing;
  }, [editing]);

  // 지도 초기화
  useEffect(() => {
    mapInstance.current = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        center: fromLonLat([coords.lon, coords.lat]),
        zoom: 12,
      }),
      controls: defaultControls({ attribution: false }),
    });

    const handleMoveEnd = () => {
      if (!editingRef.current) {
        const center = mapInstance.current.getView().getCenter();
        let [lon, lat] = toLonLat(center);
        lon = parseFloat(lon.toFixed(3));
        lat = parseFloat(lat.toFixed(3));
        setCoords({ lon, lat });
        setInputCoords({ lon, lat });
      }
    };

    mapInstance.current.on("moveend", handleMoveEnd);

    return () => mapInstance.current.setTarget(undefined);
  }, []);

  useEffect(() => {
    if (!editing && mapInstance.current) {
      mapInstance.current.getView().setCenter(fromLonLat([inputCoords.lon, inputCoords.lat]));
    }
  }, [inputCoords, editing]);

  const applyInputCoords = () => {
    const lon = parseFloat(inputCoords.lon.toFixed(3));
    const lat = parseFloat(inputCoords.lat.toFixed(3));
    setCoords({ lon, lat });
    setInputCoords({ lon, lat });
    setEditing(false);
  };

  return (
    <div>
      <MDBox display="flex" gap={3} p={3}>
        <MDBox>
          <MDInput
            type="number"
            label="Latitude"
            value={inputCoords.lat}
            onChange={(e) => {
              setEditing(true);
              setInputCoords({ ...inputCoords, lat: parseFloat(e.target.value) });
            }}
            onBlur={() => {
              let lon = parseFloat(inputCoords.lon.toFixed(3));
              let lat = parseFloat(inputCoords.lat.toFixed(3));
              setCoords(inputCoords);
              setEditing(false);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") applyInputCoords();
            }}
            fullWidth
          />
        </MDBox>
        <MDBox>
          <MDInput
            type="number"
            label="Longitude"
            value={inputCoords.lon}
            onChange={(e) => {
              setEditing(true);
              setInputCoords({ ...inputCoords, lon: parseFloat(e.target.value) });
            }}
            onBlur={() => {
              let lon = parseFloat(inputCoords.lon.toFixed(3));
              let lat = parseFloat(inputCoords.lat.toFixed(3));
              setCoords(inputCoords);
              setEditing(false);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") applyInputCoords();
            }}
            fullWidth
          />
        </MDBox>
      </MDBox>
      <div ref={mapRef} style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
}
