// src/utils/validate.js

function isVietnamesePhoneNumber(phone) {
    const regex = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
    return regex.test(phone);
}

module.exports = { isVietnamesePhoneNumber };
