import { FormControl, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { ChangeEvent } from "react";
import { useSocket } from "../../context/SocketProvider";
import { Channel } from "../../shared/guild.interface";
import { Cancel01Icon } from "hugeicons-react";
import { AddMessage } from "../../services/message.service";

export default function MessageForm(channel: Channel) {
    const [fileList, setFileList] = React.useState<File[]>([]);
    const [previewUrlList, setPreviewUrlList] = React.useState<string[]>([]);
    const [message, setMessage] = React.useState<string>('');
    const socket = useSocket();

    const onMessageChange = (event: any) => {
        setMessage(event.target.value)
    }
    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFileList(Array.from(event.target.files));
        }
    }
    const removeImage = (index: number) => {
        // Remove the image from previewUrlList
        const updatedPreviewUrlList = previewUrlList.filter((_, i) => i !== index);
        setPreviewUrlList(updatedPreviewUrlList);

        if (fileList) {
            // Convert FileList to an array
            const fileArray = Array.from(fileList);

            // Remove the file at the specified index
            const updatedFileArray = fileArray.filter((_, i) => i !== index);

            // Update fileList state with the new FileList
            setFileList(updatedFileArray);
        }
    };
    const onChatSubmit = async (event: any) => {
        try {
            event.preventDefault();
            const messageContent = event.target.message.value.trim();
            if (messageContent === '' && fileList.length === 0) return;

            const formData = new FormData();
            formData.append("channelId", channel._id);
            formData.append("message", messageContent);

            // Append files to formData
            fileList.forEach((file) => {
                formData.append("files", file);
            });

            // Send message and files to the server
            const response = await AddMessage('abc', channel._id, formData);

            setMessage('');
            setFileList([]);
            setPreviewUrlList([]);
        } 
        catch (error) {
            console.error("Error uploading message and files:", error);
        }
    };

    React.useEffect(() => {
        if (!fileList) {
            setPreviewUrlList([]);
            return;
        }

        const urls = fileList.map((file) => URL.createObjectURL(file));
        setPreviewUrlList(urls);
    }, [fileList]);

    return <Box sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        px: 3,
    }}>
        {/* Image append */}
        {previewUrlList && (
            <Box sx={{ display: "flex", alignItems: "start", flexWrap: "wrap" }}>
                {previewUrlList.map((previewUrl, index) => (
                    <Box
                        key={index}
                        sx={{ position: "relative", margin: 1 }} // Add margin for spacing between images
                    >
                        <Box sx={{ display: "inline-block", width: "25%" }}>
                            <img src={previewUrl} alt={`Preview ${index}`} style={{ width: "100%" }} />
                        </Box>
                        <IconButton
                            onClick={() => removeImage(index)} // Pass the index to the removeImage function
                            sx={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                backgroundColor: "rgba(255,255,255,0.7)"
                            }}
                        >
                            <Cancel01Icon />
                        </IconButton>
                    </Box>
                ))}
            </Box>
        )}
        <form onSubmit={onChatSubmit}>
            <Box sx={{
                display: "flex",
                alignContent: "center",
            }}>
                <input
                    type="text"
                    name="message"
                    value={message}
                    onChange={onMessageChange}
                    autoComplete="off"
                    placeholder="Type something..."
                    style={{
                        width: "90%",
                    }}
                />
                <input type="file" id="file-input" onChange={onFileChange} multiple />
            </Box>
        </form>
    </Box>
}