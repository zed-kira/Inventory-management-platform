import { Button } from "@mui/material";

// Material UI Icons
import AddIcon from '@mui/icons-material/Add';

const Reports = () => {

    const handleNew = () => {

    }

    return (
        <>

            <section>

                <div className="container vendors-header" style={{ marginTop: 50 }}>
                    <div className="row">
                        <div className="col">
                            <h1>Reports</h1>
                        </div>
                        <div className="col text-sm-start text-md-end text-lg-end text-xl-end text-xxl-end">
                            <Button 
                                onClick={handleNew}
                                variant="contained" 
                                startIcon={<AddIcon />}
                                /* style={{
                                    marginTop: 5,
                                }} */
                            >
                                New Report
                            </Button>
                        </div>
                    </div>
                </div>
            
            </section>
        </>
    );
};

export default Reports;