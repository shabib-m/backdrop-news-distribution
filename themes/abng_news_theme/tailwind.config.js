/** @type {import('tailwindcss').Config} */
module.exports = {
  // تفعيل تبديل المظهر بناءً على السمة [data-theme="dark"]
  darkMode: ['selector', '[data-theme="dark"]'],
  
  // تحديد مسارات كافة ملفات القوالب والـ PHP ليفحصها التايلوند ويستخرج الكلاسات منها
  content: [
    "./templates/**/*.php",
    "./*.php",
    "./js/**/*.js",
    "../../profiles/abng_news/content/**/*.json" // فحص ملفات الـ JSON أيضاً
  ],
  theme: {
    extend: {
      // إضافة الخطوط المخصصة للموقع
      fontFamily: {
        sans: ['Cairo', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [
    require("daisyui")
  ],
  // إعدادات مكتبة daisyUI لتفعيل الثيمات ودعم الاتجاه العربي
  daisyui: {themes: ["light","dark"], // تم إصلاح الفاصلة المضاعفة الخطأ هنا
    rtl: true, // إجبار المكونات الجاهزة على اتخاذ الاتجاه من اليمين إلى اليسار تلقائياً
  },
}
