exports.create_response = (res) => {
    res.status(200).json(
        {
            "status": true,
            "message": 'Data inserted successfully!',
        });
};

exports.fetch_data = (data, res) => {
    res.status(200).json(
        {
            "status": true,
            "message": "Data Received Successfully!",
            "data": data
        });
}