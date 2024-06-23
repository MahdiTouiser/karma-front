import React, { useEffect } from 'react';
import useApi from '../../../hooks/useApi';

const Resumes: React.FC = () => {
    const { sendRequest } = useApi<{ gender: string }, null>();

    const fetchRecords = async () => {
        sendRequest(
            {
                url: '/Resumes/Query',
                method: 'put',
                params: {
                    pagesize: 10,
                    pageIndex: 0,
                },
                data: {
                    gender: "Male"
                }
            },
            (response) => {
                console.log(response);
            }
        );
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    return (
        <div>{}</div>
    )
}

export default Resumes