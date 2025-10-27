import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function ChatMessage({ role, content }) {
  const isUser = role === "user";

  return (
    <MDBox display="flex" justifyContent={isUser ? "flex-end" : "flex-start"} width="100%" my={1}>
      <MDBox
        display="flex"
        alignItems="flex-end"
        flexDirection={isUser ? "row-reverse" : "row"}
        width="90%"
        maxWidth="90%"
      >
        {/* 아바타 */}
        <Avatar
          src={
            isUser
              ? "https://cdn-icons-png.flaticon.com/512/847/847969.png" // 사용자 아이콘
              : "https://cdn-icons-png.flaticon.com/512/4712/4712109.png" // 시스템(LLM) 아이콘
          }
          alt={isUser ? "User" : "Assistant"}
          sx={{
            width: 32,
            height: 32,
            mx: 1,
          }}
        />

        {/* 말풍선 */}
        <MDBox
          px={2}
          py={1.5}
          borderRadius="16px"
          sx={{
            backgroundColor: isUser ? "#1976d2" : "#f1f3f4",
            color: isUser ? "#fff" : "#000",
            maxWidth: "75%",
            wordBreak: "break-word",
          }}
        >
          <MDTypography
            variant="body2"
            component="p"
            sx={{ whiteSpace: "pre-line", fontweight: 600, color: isUser ? "#fff" : "#212121" }}
          >
            {content}
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

ChatMessage.propTypes = {
  role: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default ChatMessage;
