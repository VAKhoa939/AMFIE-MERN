# 🍳Assets management

## Description

backend

## Project Structure


```
src
   |routes
    └── |Assets.Routes.js
        |Address.Routes.js
        |Users.Routes.js
        |auth.Routes.js
   |middleware
    └── |auth.Middleware.js
   |controllers
    └── |Asset.Controller.js
        |Adress.Controller.js
        |User.Controller.js
        |auth.Controller.js
   |models
    └── |Asset.model.js
        |User.model.js
        |Addressmodel..js
   ├── utils/
    └── |validate.js
   |server.js
   |sendEmail.js


## Cấu hình

 touch .env
<!-- tạo file .env -->

# MongoDB
MONGODB_URI=mongodb://localhost:27017/assets
DATABASE_NAME=Assets

# Cấu hình cổng ứng dụng
APP_HOST=localhost
APP_PORT=8017

# JWT Secret key (sử dụng để mã hóa và giải mã token)
JWT_SECRET=your-jwt-secret

# Google OAuth Client ID và Client Secret (Dùng cho đăng nhập bằng Google)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:8017/api/auth/google/callback

# Cấu hình email (nếu bạn dùng để gửi email qua SMTP)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USERNAME=your-email@example.com
EMAIL_PASSWORD=your-email-password

tạo bảo mật 2 lớp gmail -> 