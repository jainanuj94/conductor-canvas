import {useState} from 'react';
import {Modal, Button, Box, Typography} from '@mui/material';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Workflow} from "../types/Workflow.ts";

type Props = {
    open: boolean,
    handleClose: VoidFunction,
    jsonContent: Workflow
};

const ModalComponent = (props: Props) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copy state after 2 seconds
    };

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px'
            }}
        >
            <Box
                className="p-6 bg-white rounded-lg shadow-lg"
                sx={{
                    width: '80%',
                    maxWidth: '600px',
                    backgroundColor: 'white',
                    padding: '4px'
                }}
            >
                <Typography id="modal-title" variant="h6" component="h2">
                    JSON Content
                </Typography>
                <pre
                    id="modal-description"
                    className="mt-4 p-4 bg-gray-100 rounded"
                    style={{
                        maxHeight: '300px', // You can adjust the max height as needed
                        overflowY: 'auto',
                        whiteSpace: 'pre-wrap', // To wrap long lines
                        wordBreak: 'break-word', // To prevent overflow
                    }}
                >
                {JSON.stringify(props.jsonContent, null, 2)}
                </pre>
                <CopyToClipboard text={JSON.stringify(props.jsonContent, null, 2)} onCopy={handleCopy}>
                    <Button
                        variant="contained"
                        color="primary"
                        className="mt-4 p-4"
                    >
                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </Button>
                </CopyToClipboard>
                <Button
                    variant="outlined"
                    color="secondary"
                    className="absolute top-2 right-2 p-4"
                    onClick={props.handleClose}
                >
                    Close
                </Button>
            </Box>
        </Modal>
    );
};

export default ModalComponent;
