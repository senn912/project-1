import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "~/api/getUser";
import { updateInformationUser } from "~/api/updateInformationUser";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Avatar,
  Divider,
  Box,
  Alert,
} from "@mui/material";

export default function ManageAccountPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser()
      .then((data) => {
        setUser(data.user);
        console.log(data.user);
        if (data.user) {
          setFullName(data.user.fullName || "");
          setEmail(data.user.email || "");
          setNickName(data.user.nickName || "");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setUser(null);
      });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user?.id) {
      setError("Không tìm thấy ID user");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const result = await updateInformationUser(
        user.id,
        email,
        fullName,
        password,
        nickName
      );

      console.log("Update result:", result);

      if (result.success) {
        setMessage("Updated!");
      } else {
        setError(result.message || "Update Fail");
      }
    } catch (err) {
      setError("Error Server: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ p: 3, borderRadius: 6, boxShadow: 10 }}>
        <CardContent>
          <Stack direction="row" spacing={4} alignItems="flex-start">
            <Box
              sx={{
                width: 250,
                textAlign: "center",
                flexShrink: 0,
              }}
            >
              <Avatar sx={{ width: 100, height: 100, mx: "auto" }}>
                {fullName.charAt(0)}
              </Avatar>
              <Typography
                variant="h6"
                sx={{
                  mt: 2,
                  maxWidth: 250,
                  wordBreak: "break-word",
                  whiteSpace: "normal",
                  textAlign: "center",
                  mx: "auto",
                }}
              >
                {fullName}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1, textTransform: "none" }}
              >
                Update Avatar
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1, textTransform: "none" }}
              >
                Change Password
              </Button>
            </Box>

            <Box flex={1}>
              <Typography variant="h5" gutterBottom>
                UPDATE INFORMATION
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Stack spacing={2}>
                {error && <Alert severity="error">{error}</Alert>}
                {message && <Alert severity="success">{message}</Alert>}
                <TextField
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Nick Name"
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleUpdate}
                >
                  UPDATE
                </Button>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
