# Surgery Team 2027 — فريق الجراحة

المشروع الكامل للعرض التفاعلي العربي لفريق الجراحة، بآخر التعديلات المعتمدة.
يتضمن 11 شريحة، هويات الحملات، رحلة الطالب المتحركة، نوافذ Surgery Hub، التعاون، التوثيق، والختام.

الموقع HTML وCSS وJavaScript، مع الصور والخطوط محليًا. لا يحتاج تثبيت مكتبات أو خطوة بناء.

## الرفع إلى GitHub

1. فك ضغط الملف.
2. أنشئ مستودعًا جديدًا، مثل `surgery-team-2027`.
3. ارفع **محتويات هذا المجلد**، بحيث يظهر `package.json` و`README.md` ومجلد `docs` في جذر المستودع. لا ترفع ملف ZIP نفسه بدل الملفات.

وإذا كنت تستخدم Git من داخل مجلد المشروع:

```sh
git init
git add .
git commit -m "Initial Surgery Team 2027 website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/surgery-team-2027.git
git push -u origin main
```

استبدل `YOUR_USERNAME` واسم المستودع ببيانات مستودعك.

## نشر الموقع على GitHub Pages

من إعدادات المستودع:

1. افتح **Settings → Pages**.
2. اختر **Deploy from a branch**.
3. اختر فرع **main** ومجلد **/docs**.
4. اضغط **Save**.

سيظهر رابط الموقع في صفحة Pages. الشكل المعتاد للرابط:
`https://YOUR_USERNAME.github.io/surgery-team-2027/`.

مجلد `docs` هو الموقع نفسه، وليس مجرد مستندات شرح. جميع مسارات الصور والخطوط نسبية لتعمل تحت اسم المستودع.

[تعليمات GitHub الرسمية لاختيار مصدر النشر](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## التشغيل المحلي

يتطلب Node.js 20 أو أحدث:

```sh
npm start
```

ثم افتح `http://127.0.0.1:4173`، وأوقف الخادم باستخدام Ctrl+C.
لا يلزم تشغيل `npm install` لأن المشروع لا يحتوي على اعتماديات خارجية.
استخدم الخادم المحلي للمعاينة؛ فتح `docs/index.html` مباشرة قد يمنع تحميل وحدات JavaScript.

## أين تعدّل؟

| الملف | وظيفته |
| --- | --- |
| `docs/content.js` | ترتيب الشرائح وأسماء الفريق والبيانات الأساسية |
| `docs/scenes.js` | تكوين الغلاف وشريحة الفريق |
| `docs/app.js` | التنقل والعداد وزر العودة إلى البداية |
| `docs/campaigns.js` | الحملات والتايملاين وتعريفات الحملات |
| `docs/campaign-logos.js` | شعارات الحملات |
| `docs/journey.js` و`docs/student-graphic.js` | طريق الطالب والشخصية وحركة المشي |
| `docs/hub.js` | تصوّر المنصة ونوافذ الأقسام الخمسة |
| `docs/operations.js` | الدعم والتعاون وخطوات التوثيق |
| `docs/operations-art.js` | الرسومات المتجهة للتعاون والتوثيق والدعم |
| `docs/presentation-controls.css` | رقم الشريحة والكلمة المحيطة به وشريط التنقل |
| `docs/finale.js` و`docs/finale.css` | سلايدة الختام وانتقالها |
| `docs/assets/` | جميع الصور والخطوط والشعارات |
| `docs/sw.js` | ذاكرة التخزين للموقع؛ غيّر اسم CACHE عند إصدار تحديث جديد |

بقية ملفات CSS تضبط تصميم كل جزء، وملفات Markdown الإضافية تشرح بناءه ومراجعه.

## التحقق والتصدير

```sh
npm run check
npm run export
```

الأمر الأول يفحص ترتيب الشرائح والملفات وصياغة JavaScript. الثاني ينتج نسخة HTML مستقلة مضمّنًا فيها الصور والخطوط داخل `exports/Surgery-Team-2027-Dark.html`.

## محتويات النسخة

- ملفات الموقع كاملة، بما فيها الخطوط والصور.
- أدوات التشغيل والفحص وتصدير HTML مستقل.
- ملف `.nojekyll` للنشر كملفات ثابتة على GitHub Pages.
- لقطة مطابقة لمصدر النسخة 21؛ لا تتضمن سجل Git أو إعدادات ربط الاستضافة السابقة.
