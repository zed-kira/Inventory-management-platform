// React

// Ant Design 
import { Card } from 'antd';
import { Button, message } from 'antd';

// tremor
import { TextInput, ColGrid, Col } from "@tremor/react";

// Material UI Icons
import AddIcon from '@mui/icons-material/Add';

// react-uuid
import uuid from 'react-uuid';


const Integrations = () => {

    const [messageApi, contextHolder] = message.useMessage();

    const copy = () => {
        let copyText = document.getElementById("apiKey");

        copyText.select();
        copyText.setSelectionRange(0, 99999);

        navigator.clipboard.writeText(copyText.value);

        messageApi.info('API Key Copied');
    }

    
    return (
        <>
            {contextHolder}

            <section>

                <div className="container integrations-header" style={{ marginTop: 50 }}>
                    <div className="row">
                        <div className="col">
                            <h1>Integrations</h1>
                        </div>
                        <div className="col text-sm-start text-md-end text-lg-end text-xl-end text-xxl-end">
                            <Button
                                variant="contained" 
                                startIcon={<AddIcon />}
                            >
                                Browse API Docs
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="container integrations-api-key" style={{ marginTop: 50, marginBottom: '50vh' }}>
                    <div className="row">
                    <Card title="API KEY">
                        <ColGrid numCols={1} numColsSm={2} numColsLg={3} gapX="gap-x-2" gapY="gap-y-2">
                            <Col numColSpan={1} numColSpanLg={2}>
                                <TextInput
                                    id="apiKey"
                                    defaultValue={uuid()}
                                    //placeholder={uuid()}
                                    icon={undefined}
                                    error={false}
                                    errorMessage=""
                                    disabled={true}
                                    maxWidth="max-w-none"
                                    marginTop="mt-0"
                                />
                            </Col>
                            <Col>
                                <Button onClick={copy} type="primary">Copy</Button>
                            </Col>
                        </ColGrid>
                    </Card>
                    </div>
                </div>
            
            </section>
        </>
    );
};

export default Integrations;