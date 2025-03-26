# Fast-food restorani uchun BackEnd API 🍔

## Loyihaning maqsadi: 🥗

- Biror bir fast-food reastorani uchun menyularni ko'rish va ovqatlarga buyurtma berish imkoniyati beruvchi loyihaning BackEnd API'ni ishlab chiqish

## Funksional talablar

- Barcha taomlarni category'lari bo'lishi kerak. Misol, burgerlar, pitsalar va hkz.
- Har bir taom biror category'ga mansub bo'lishi kerak.
- Taomning 1 ta rasmi, nomi, narxi, description bo'lishi kerak.
- Foydalanuvchi ro'yhatdan o'tmagan holatda ham category va taomlarni ko'rishi kerak
- Foydalanuvchi email va name bilan ro'yxatdan o'tadi
- Profilga kirish email orqali bo'ladi
- Foydalanuvchi savatga mahsulotlar qo'sha olishi kerak
- Foydalanuvchi bir nechta mahsulotni zakaz qila olishi kerak
- Foydalanuvchi profilida o'z zakazlari tarixini ko'rishi kerak
- Foydalanuvchi profilini yangilay olishi kerak

## Nofunksional talablar

- Tezlik
- Xavfsizlik
- Kengaya oladigan

## Database models:

1. Category:

   - id
   - name
   - createdAt
   - updatedAt

2. Food:

   - id
   - name
   - price
   - desctiption
   - imageUrl
   - categoryId (FK)
   - createdAt
   - updatedAt

3. Users:

   - id
   - name
   - email
   - imageUrl
   - createdAt
   - updatedAt

4. Orders:

   - id
   - createdAt
   - total_price
   - userId (FK)

5. OrderItem:
   - count
   - orderId (FK)
   - foodId (FK)
