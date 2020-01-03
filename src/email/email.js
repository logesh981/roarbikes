const sgMail=require('@sendgrid/mail')
const sendgridAPIKey=''
sgMail.setApiKey(process.env.SEND_API_KEY)
const sendWelcomeEmail=(email,username)=>{
    
    sgMail.send({
        to:email,
        from:'loki.venkat98@gmail.com',
        subject:'Welcome to Roar bikes family',
        text:`Hi ${username} , Thank you for trusting us,We at roar bikes ensure that our customers are always happy with our service`
    })   
} 
const feedbackMail=(name,email,message)=>{
    sgMail.send({
        to:'loki.venkat98@gmail.com',
        from:'loki.venkat98@gmail.com',
        subject:`feedback from ${name}`,
        text:message
    })
}
const sendOrderEmail=(email,username)=>{
    sgMail.send({
        to:email,
        from:'loki.venkat98@gmail.com',
        subject:'Order received',
        text:`Hi ${username} ,We have received your order and our executive will contact you soon`
    }) 
}
module.exports={
    sendWelcomeEmail,
    sendOrderEmail,feedbackMail
}