const html_template = (allDetails) => {
    const { userData, productData, paymentData } = allDetails;
    const new_date = new Date();
    const date = `${new_date.toLocaleString('en-us', { month: 'short' })} ${new_date.getDate()}, ${new_date.getFullYear()}`;

    const year = new_date.getFullYear();
    const month = (new_date.getMonth() + 1).toString().padStart(2, '0');
    const day = new_date.getDate().toString().padStart(2, '0');
    const hour = new_date.getHours().toString().padStart(2, '0');
    const minute = new_date.getMinutes().toString().padStart(2, '0');
    const second = new_date.getSeconds().toString().padStart(2, '0');

    const invoiceNumber = `#${year}${month}${day}${hour}${minute}${second}`;

    let html = `
    <!DOCTYPE html><html><head></head><body> <table width="100%" border="1" cellspacing="0" cellpadding="0"> <tr> <td> <table width="80%" align="center" border="0" cellpadding="20" style="font-family: Arial, sans-serif; border-collapse: collapse;"> <tr> <td align="left" valign="middle" width="50%"> <h1 style="margin: 0;">Invoice</h1> </td> <td align="right" valign="middle" width="50%"> <img src="https://eeggdcf.stripocdn.email/content/guids/CABINET_1fc30adc0c5b58cc6271e7d91541bbee183db7d94f0b2d2d615c264691c7cb9c/images/logo.png" alt="Your Logo" style="max-width: 150px; height: auto;"> </td> </tr> <tr> <td> <p style="margin-bottom: 1px;"><strong>Name:</strong> ${userData.name}</p> <p style="margin-bottom: 1px;"><strong>Email:</strong> ${userData.email}</p> <p style="margin-bottom: 1px;"><strong>Address:</strong> ${userData.address}</p> <p style="margin-bottom: 1px;"><strong>Phone:</strong> +91 ${userData.phone}</p> </td> <td align="right"> <p style="margin-bottom: 1px;"><strong>Date:</strong> ${date}</p> <p style="margin-bottom: 1px;"><strong>Invoice Number:</strong> ${invoiceNumber}</p> </td> </tr> <tr> <td colspan="2"> <table width="100%" border="0" cellpadding="8" style="border-collapse: collapse;"> <thead> <tr style="font-size: 18px;"> <th>Product Name</th> <th>Quantity</th> <th>Price</th> <th>Subtotal</th> </tr> <tr> <td colspan="4" align="center"> <hr style="border-top: 1px solid #000; opacity: 0.5;"> </td> </tr> </thead> <tbody> ${productData.map(product => ` <tr> <td align="center">${product.pName}</td> <td align="center">${product.quantity}</td> <td align="center">₹ ${product.price}</td> <td align="center">₹ ${product.subtotal}</td> </tr> `).join('')} </tbody> </table> </td> </tr> <td colspan="4" align="center"> <hr style="border-top: 1px solid #000; opacity: 0.5;"> </td> <tr> <td> <p style="margin-bottom: 1px;"><strong>Total Amount Paid:</strong> ₹ ${paymentData.totalAmount}</p> <p style="margin-bottom: 1px;"><strong>Payment ID:</strong> ${paymentData.paymentID}</p> </td> <td align="right" valign="middle"> <div style="max-width: 100px; background-color: #4CAF50; color: white; padding: 5px 10px; border-radius: 5px; font-weight: bold; font-size: 20px; text-align: center;">PAID</div> </td> </tr> <td colspan="4" align="center"> <hr style="border-top: 1px solid #000; opacity: 0.5;"> ❤️ Thank you for your order</td> </table> </td> </tr> </table></body></html>`;

    return html;
}

module.exports = html_template;
