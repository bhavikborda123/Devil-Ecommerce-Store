const html_template = (name, email, app_url) => {
    let html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en"> <head> <meta charset="UTF-8" /> <meta content="width=device-width, initial-scale=1" name="viewport" /> <meta name="x-apple-disable-message-reformatting" /> <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <meta content="telephone=no" name="format-detection" /> <title>User welcome</title> <!--[if (mso 16)]> <style type="text/css"> a { text-decoration: none; } </style> <![endif]--> <!--[if gte mso 9]> <style> sup { font-size: 100% !important; } </style> <![endif]--> <!--[if gte mso 9]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml> <![endif]--> <!--[if !mso]><!-- --> <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet" /> <!--<![endif]--> <style type="text/css"> .rollover:hover .rollover-first { max-height: 0px !important; display: none !important; } .rollover:hover .rollover-second { max-height: none !important; display: block !important; } .rollover span { font-size: 0px; } u + .body img ~ div div { display: none; } #outlook a { padding: 0; } span.MsoHyperlink, span.MsoHyperlinkFollowed { color: inherit; mso-style-priority: 99; } a.es-button { mso-style-priority: 100 !important; text-decoration: none !important; } a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } .es-desk-hidden { display: none; float: left; overflow: hidden; width: 0; max-height: 0; line-height: 0; mso-hide: all; } .es-button-border:hover > a.es-button { color: #64434a !important; } @media only screen and (max-width: 600px) { *[class="gmail-fix"] { display: none !important; } p, a { line-height: 150% !important; } h1, h1 a { line-height: 120% !important; } h2, h2 a { line-height: 120% !important; } h3, h3 a { line-height: 120% !important; } h4, h4 a { line-height: 120% !important; } h5, h5 a { line-height: 120% !important; } h6, h6 a { line-height: 120% !important; } h1 { font-size: 30px !important; text-align: center; } h2 { font-size: 26px !important; text-align: center; } h3 { font-size: 20px !important; text-align: center; } h4 { font-size: 24px !important; text-align: left; } h5 { font-size: 20px !important; text-align: left; } h6 { font-size: 16px !important; text-align: left; } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size: 30px !important; } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size: 26px !important; } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size: 20px !important; } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size: 24px !important; } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size: 20px !important; } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size: 16px !important; } .es-menu td a { font-size: 14px !important; } .es-header-body p, .es-header-body a { font-size: 14px !important; } .es-content-body p, .es-content-body a { font-size: 16px !important; } .es-footer-body p, .es-footer-body a { font-size: 14px !important; } .es-infoblock p, .es-infoblock a { font-size: 12px !important; } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align: center !important; } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align: right !important; } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align: justify !important; } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align: left !important; } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display: inline !important; } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display: inline !important; } .es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height: 0 !important; font-size: 0 !important; } .es-spacer { display: inline-table; } a.es-button, button.es-button { font-size: 20px !important; line-height: 120% !important; } a.es-button, button.es-button, .es-button-border { display: inline-block !important; } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display: block !important; } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display: inline-block !important; } .es-adaptive table, .es-left, .es-right { width: 100% !important; } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width: 100% !important; max-width: 600px !important; } .adapt-img { width: 100% !important; height: auto !important; } .es-mobile-hidden, .es-hidden { display: none !important; } .es-desk-hidden { width: auto !important; overflow: visible !important; float: none !important; max-height: inherit !important; line-height: inherit !important; } tr.es-desk-hidden { display: table-row !important; } table.es-desk-hidden { display: table !important; } td.es-desk-menu-hidden { display: table-cell !important; } .es-menu td { width: 1% !important; } table.es-table-not-adapt, .esd-block-html table { width: auto !important; } .es-social td { padding-bottom: 10px; } .h-auto { height: auto !important; } } @media screen and (max-width: 384px) { .mail-message-content { width: 414px !important; } } </style> </head> <body class="body" style="width: 100%; height: 100%; padding: 0; margin: 0;"> <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color: #ffffff;"> <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#ffffff"></v:fill> </v:background><![endif]--> <table class="es-wrapper" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; padding: 0; margin: 0; width: 100%; height: 100%; background-repeat: repeat; background-position: center top; background-color: #ffffff; " width="100%" cellspacing="0" cellpadding="0" role="none" > <tr style="border-collapse: collapse;"> <td valign="top" style="padding: 0; margin: 0;"> <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; width: 100%; table-layout: fixed !important;" > <tr style="border-collapse: collapse;"> <td class="es-adaptive" align="center" style="padding: 0; margin: 0;"> <table class="es-content-body" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; background-color: transparent; width: 600px;" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" > <tr style="border-collapse: collapse;"> <td align="left" style="padding: 10px; margin: 0;"> <!--[if mso]><table style="width:580px"><tr><td style="width:280px" valign="top"><![endif]--> <table class="es-left" cellspacing="0" cellpadding="0" align="left" role="none" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; float: left;" > <tr style="border-collapse: collapse;"> <td align="left" style="padding: 0; margin: 0; width: 280px;"> <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;"> <tr style="border-collapse: collapse;"> <td class="es-infoblock es-m-txt-c" align="left" style="padding: 0; margin: 0;"> <p style=" margin: 0; mso-line-height-rule: exactly; font-family: helvetica, 'helvetica neue', arial, verdana, sans-serif; line-height: 18px; letter-spacing: 0; color: #cccccc; font-size: 12px; " > ​ </p> </td> </tr> </table> </td> </tr> </table> <!--[if mso]></td><td style="width:20px"></td><td style="width:280px" valign="top"><![endif]--> <table class="es-right" cellspacing="0" cellpadding="0" align="right" role="none" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; float: right;" > <tr style="border-collapse: collapse;"> <td align="left" style="padding: 0; margin: 0; width: 280px;"> <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;"> <tr style="border-collapse: collapse;"> <td align="center" style="padding: 0; margin: 0; display: none;"></td> </tr> </table> </td> </tr> </table> <!--[if mso]></td></tr></table><![endif]--> </td> </tr> </table> </td> </tr> </table> <table class="es-header" cellspacing="0" cellpadding="0" align="center" role="none" style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; width: 100%; table-layout: fixed !important; background-color: transparent; background-repeat: repeat; background-position: center top; " > <tr style="border-collapse: collapse;"> <td align="center" style="padding: 0; margin: 0;"> <table class="es-header-body" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; background-color: transparent; width: 600px;" cellspacing="0" cellpadding="0" align="center" role="none" > <tr style="border-collapse: collapse;"> <td align="left" style="padding: 0; margin: 0;"> <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;"> <tr style="border-collapse: collapse;"> <td valign="top" align="center" style="padding: 0; margin: 0; width: 600px;"> <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;"> <tr style="border-collapse: collapse;"> <td align="center" style="padding: 0; margin: 0; padding-bottom: 20px; font-size: 0;"> <a target="_blank" href="${app_url}" style="mso-line-height-rule: exactly; text-decoration: none; color: #f6a1b4; font-size: 14px;"> <img src="https://eeggdcf.stripocdn.email/content/guids/CABINET_1fc30adc0c5b58cc6271e7d91541bbee183db7d94f0b2d2d615c264691c7cb9c/images/logo.png" alt="Logo" style="display: block; font-size: 14px; border: 0; outline: none; text-decoration: none;" width="154" class="adapt-img" /> </a> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; width: 100%; table-layout: fixed !important;" > <tr style="border-collapse: collapse;"> <td align="center" style="padding: 0; margin: 0;"> <table class="es-content-body" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; background-color: transparent; width: 600px;" cellspacing="0" cellpadding="0" align="center" role="none" > <tr style="border-collapse: collapse;"> <td align="left" style="padding: 0; margin: 0;"> <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;"> <tr style="border-collapse: collapse;"> <td valign="top" align="center" style="padding: 0; margin: 0; width: 600px;"> <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: separate; border-spacing: 0px; border-radius: 3px; background-color: #fcfcfc;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fcfcfc" role="presentation" > <tr style="border-collapse: collapse;"> <td class="es-m-txt-l" align="left" style="padding: 0; margin: 0; padding-top: 30px; padding-right: 20px; padding-left: 20px;"> <h1 style=" margin: 0; font-family: roboto, 'helvetica neue', helvetica, arial, sans-serif; mso-line-height-rule: exactly; letter-spacing: 0; font-size: 30px; font-style: normal; font-weight: normal; line-height: 36px; color: #333333; " > Welcome! 🎉 </h1> </td> </tr> <tr style="border-collapse: collapse;"> <td bgcolor="#fcfcfc" align="left" style="padding: 0; margin: 0; padding-right: 20px; padding-left: 20px; padding-top: 10px;"> <p style=" mso-line-height-rule: exactly; font-family: helvetica, 'helvetica neue', arial, verdana, sans-serif; line-height: 21px; letter-spacing: 0; color: #333333; font-size: 14px; " > Your account has been verified. ✅ <br /> <br /> Welcome to Devil Store! Dive into a world of convenience and endless possibilities. Discover top-notch products, seamless shopping experiences, and exceptional service. Whether you're browsing or buying, we're here to make your online shopping journey unforgettable. Start exploring now and elevate your shopping experience! <br /> </p> </td> </tr> </table> </td> </tr> </table> </td> </tr> <tr style="border-collapse: collapse;"> <td style="padding: 0; margin: 0; padding-top: 30px; padding-right: 20px; padding-left: 20px; background-color: #fcfcfc;" bgcolor="#fcfcfc" align="left"> <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;"> <tr style="border-collapse: collapse;"> <td valign="top" align="center" style="padding: 0; margin: 0; width: 560px;"> <table style=" mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: separate; border-spacing: 0px; border-color: #efefef; border-style: solid; border-width: 1px; border-radius: 3px; background-color: #ffffff; " width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff" role="presentation" > <tr style="border-collapse: collapse;"> <td align="center" style="padding: 0; margin: 0; padding-top: 20px; padding-bottom: 15px;"> <h3 style=" margin: 0; font-family: roboto, 'helvetica neue', helvetica, arial, sans-serif; mso-line-height-rule: exactly; letter-spacing: 0; font-size: 18px; font-style: normal; font-weight: normal; line-height: 22px; color: #333333; " > Your account information: </h3> </td> </tr> <tr style="border-collapse: collapse;"> <td align="center" style="padding: 0; margin: 0;"> <p style=" margin: 0; mso-line-height-rule: exactly; font-family: helvetica, 'helvetica neue', arial, verdana, sans-serif; line-height: 24px; letter-spacing: 0; color: #64434a; font-size: 16px; " > Name: ${name} </p> <p style=" margin: 0; mso-line-height-rule: exactly; font-family: helvetica, 'helvetica neue', arial, verdana, sans-serif; line-height: 24px; letter-spacing: 0; color: #64434a; font-size: 16px; " > Email: ${email} </p> </td> </tr> <tr style="border-collapse: collapse;"> <td align="center" style="margin: 0; padding-bottom: 20px; padding-top: 20px; padding-right: 10px; padding-left: 10px;"> <span class="es-button-border" style="border-style: solid; border-color: transparent; background: #f8f3ef; border-width: 0px; display: inline-block; border-radius: 3px; width: auto;" > <a href="${app_url}" class="es-button" target="_blank" style=" mso-style-priority: 100 !important; text-decoration: none !important; mso-line-height-rule: exactly; color: #64434a; font-size: 17px; padding: 10px 20px 10px 20px; display: inline-block; background: #f8f3ef; border-radius: 3px; font-family: roboto, 'helvetica neue', helvetica, arial, sans-serif; font-weight: normal; font-style: normal; line-height: 20px; width: auto; text-align: center; letter-spacing: 0; mso-padding-alt: 0; mso-border-alt: 10px solid #f8f3ef; " > Visit Site Now </a> </span> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; width: 100%; table-layout: fixed !important;" > <tr style="border-collapse: collapse;"> <td align="center" style="padding: 0; margin: 0;"> <table class="es-content-body" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; background-color: transparent; width: 600px;" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" > <tr style="border-collapse: collapse;"> <td align="left" style="padding: 0; margin: 0;"> <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;"> <tr style="border-collapse: collapse;"> <td valign="top" align="center" style="padding: 0; margin: 0; width: 600px;"> <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; background-color: #fff4f7;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fff4f7" role="presentation" > <tr style="border-collapse: collapse;"> <td align="center" style="margin: 0; padding-right: 20px; padding-left: 20px; padding-top: 20px; padding-bottom: 5px;"> <h3 style=" margin: 0; font-family: roboto, 'helvetica neue', helvetica, arial, sans-serif; mso-line-height-rule: exactly; letter-spacing: 0; font-size: 18px; font-style: normal; font-weight: normal; line-height: 22px; color: #333333; " > Let's get social </h3> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; width: 100%; table-layout: fixed !important;" > <tr style="border-collapse: collapse;"> <td style="padding: 0; margin: 0; background-color: #666666;" bgcolor="#666666" align="center"> <table class="es-content-body" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; background-color: transparent; width: 600px;" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" > <tr style="border-collapse: collapse;"> <td align="left" style="padding: 0; margin: 0;"> <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;"> <tr style="border-collapse: collapse;"> <td valign="top" align="center" style="padding: 0; margin: 0; width: 600px;"> <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: separate; border-spacing: 0px; background-color: #fff4f7; border-radius: 3px;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fff4f7" role="presentation" > <tr style="border-collapse: collapse;"> <td bgcolor="#fff4f7" align="center" style="margin: 0; padding-right: 20px; padding-left: 20px; padding-bottom: 5px; padding-top: 5px; font-size: 0;"> <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" > <tr style="border-collapse: collapse;"> <td style="padding: 0; margin: 0; border-bottom: 1px solid #fff4f7; background: #ffffff none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;"></td> </tr> </table> </td> </tr> <tr style="border-collapse: collapse;"> <td align="center" style="margin: 0; padding-right: 20px; padding-left: 20px; padding-top: 5px; padding-bottom: 25px; font-size: 0;"> <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" > <tr style="border-collapse: collapse;"> <td valign="top" align="center" style="padding: 0; margin: 0; padding-right: 10px;"> <a target="_blank" href="${app_url}" style="mso-line-height-rule: exactly; text-decoration: none; color: #f6a1b4; font-size: 14px;"> <img title="Facebook" src="https://eeggdcf.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display: block; font-size: 14px; border: 0; outline: none; text-decoration: none;" /> </a> </td> <td valign="top" align="center" style="padding: 0; margin: 0; padding-right: 10px;"> <a target="_blank" href="${app_url}" style="mso-line-height-rule: exactly; text-decoration: none; color: #f6a1b4; font-size: 14px;"> <img title="X.com" src="https://eeggdcf.stripocdn.email/content/assets/img/social-icons/logo-black/x-logo-black.png" alt="X" width="32" style="display: block; font-size: 14px; border: 0; outline: none; text-decoration: none;" /> </a> </td> <td valign="top" align="center" style="padding: 0; margin: 0; padding-right: 10px;"> <a target="_blank" href="${app_url}" style="mso-line-height-rule: exactly; text-decoration: none; color: #f6a1b4; font-size: 14px;"> <img title="Instagram" src="https://eeggdcf.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display: block; font-size: 14px; border: 0; outline: none; text-decoration: none;" /> </a> </td> <td valign="top" align="center" style="padding: 0; margin: 0; padding-right: 10px;"> <a target="_blank" href="${app_url}" style="mso-line-height-rule: exactly; text-decoration: none; color: #f6a1b4; font-size: 14px;"> <img title="Youtube" src="https://eeggdcf.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32" style="display: block; font-size: 14px; border: 0; outline: none; text-decoration: none;" /> </a> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </div> </body></html>`
    return html
}

module.exports = html_template;