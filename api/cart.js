// api/cart.js
export default async function handler(req, res) {
    const { p } = req.query;
    
    // Product mapping
    const products = {
        'sm': '6717b5304a0aa795e1de7bf6', // semaglutide monthly $249
        's90': '6740b24d549a89a4abc4d25c', // semaglutide 90-day $498
        'tm': '6717b5946a2fc2a2500998dd',  // tirzepatide monthly $349
        #'t90': '6740b2cfe34bda25c01b2108'  // tirzepatide 90-day $658
    };
    
    try {
        const response = await fetch('https://public-api.portals.care/v2/carts', {
            method: 'POST',
            headers: {
                'organization': 'cmwl',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([{
                quantity: 1, 
                productId: products[p] || products.sm
            }])
        });
        
        const cart = await response.json();
        res.redirect(302, `https://cmwl.portals.care/checkouts/${cart._id}?start=signup`);
        
    } catch (error) {
        res.redirect(302, 'https://centerformedicalweightloss.com');
    }
}

