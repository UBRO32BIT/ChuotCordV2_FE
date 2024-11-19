import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { Attachment } from '../../shared/attachment.interface';
import { Message } from '../../shared/message.interface';
import { formatDateTime } from '../../utils/date';

export default function MessageComponent(message: Message) {
    const renderAttachment = (attachment: Attachment) => {
        switch (attachment.type) {
            case 'image':
                return (
                    <Box
                        key={attachment._id}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start', // Align to the start
                            mt: 1,
                        }}
                    >
                        <img
                            src={attachment.fullUrl}
                            crossOrigin="anonymous"
                            alt="attachment"
                            style={{
                                maxWidth: '50%', // Dynamic width relative to the parent
                                borderRadius: '8px',
                            }}
                        />
                    </Box>
                );
            case 'video':
                return (
                    <Box
                        key={attachment._id}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start', // Align to the start
                            mt: 1,
                        }}
                    >
                        <video
                            controls
                            crossOrigin="anonymous"
                            style={{
                                maxWidth: '50%', // Dynamic width relative to the parent
                                borderRadius: '8px',
                            }}
                        >
                            <source src={attachment.fullUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Box>
                );
            default:
                // Handle other types (e.g., files)
                return (
                    <Box
                        key={attachment._id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mt: 1,
                        }}
                    >
                        <InsertDriveFileIcon color="action" sx={{ mr: 1 }} />
                        <a
                            href={attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                textDecoration: 'none',
                                color: 'blue',
                            }}
                        >
                            {attachment.fullUrl.split('/').pop()}
                        </a>
                    </Box>
                );
        }
    };
    

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1,
                py: 0.5,
            }}
        >
            <Box>
                <Avatar
                    src={message.sender.profilePicture}
                    alt=""
                    sx={{ width: 42, height: 42 }}
                />
            </Box>
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="body1" fontWeight="bold">
                        {message.sender.username}
                    </Typography>
                    <Typography variant="body2" color="gray">
                        {formatDateTime(message.timestamp)}
                    </Typography>
                </Box>
                <Box>{message.content}</Box>
                <Box>
                    {message.attachments && message.attachments.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                            {message.attachments.map(renderAttachment)}
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}