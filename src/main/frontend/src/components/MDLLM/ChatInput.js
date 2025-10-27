import React, { useState } from "react";
import PropTypes from "prop-types";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      py={2}
      px={1}
      borderTop="1px solid #e0e0e0"
      sx={{ backgroundColor: "#fafafa" }}
    >
      <MDBox display="flex" alignItems="center" justifyContent="space-between" width="90%" gap={1}>
        <MDInput
          fullWidth
          type="text"
          placeholder="질문을 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          sx={{
            backgroundColor: "white",
            borderRadius: "12px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        />

        <MDButton
          variant="gradient"
          color="info"
          onClick={handleSend}
          sx={{
            height: "45px",
            px: 3,
            fontWeight: "bold",
            borderRadius: "12px",
            whiteSpace: "nowrap",
          }}
        >
          전송
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
};

export default ChatInput;
