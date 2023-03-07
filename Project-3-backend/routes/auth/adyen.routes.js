async function getSession(currency, value, countryCode){
    console.log(currency)
    return checkout.sessions({
        amount: { currency: currency, value: parseFloat(value) },
        reference: "123",
        returnUrl: `${baseUrl}:${port}/payment-return`,
        merchantAccount: 'BudapestkozutECOM',
        countryCode: countryCode,
        
    })
        .then((response) => {
           return response;
        })
        .catch((e) => {
            console.log(e);
        });
}

app.post('/webhook', (req, res) => {
    console.log(req.notificationItems[0].success);
});

app.post('/get-config', async (req, res) => {
    console.log(req.body)
    let configuration = await getSession(req.body.currency, req.body.value, req.body.countryCode);
    res.send(configuration);
});

app.listen(port, function(){
    console.log('up and running');
})

getSession();