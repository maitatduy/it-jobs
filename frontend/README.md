# IT Jobs Frontend

Frontend cho dự án tuyển dụng IT, xây dựng bằng Next.js (App Router), TypeScript và Tailwind CSS.

## Công nghệ sử dụng

- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS 3
- React Icons
- Yarn (node-modules linker)

## Yêu cầu môi trường

- Node.js 20+
- Yarn 1.22+ (hoặc Yarn Berry đã bật `nodeLinker: node-modules`)

## Cài đặt và chạy local

```bash
yarn install
yarn dev
```

Mặc định ứng dụng chạy tại: `http://localhost:3000`

## Scripts

- `yarn dev`: chạy môi trường development
- `yarn build`: build production
- `yarn start`: chạy bản build production
- `yarn lint`: kiểm tra ESLint

## Cấu trúc thư mục chính

```text
src/app/
  (pages)/                 # Route groups theo từng khu vực
  components/              # UI components dùng lại
  globals.css              # Global styles
  layout.tsx               # Root layout
```

## Các route hiện có

### Public

- `/` - trang chủ
- `/search` - tìm kiếm việc làm
- `/job/detail/[slug]` - chi tiết công việc
- `/company/list` - danh sách công ty
- `/company/detail/[slug]` - chi tiết công ty

### Xác thực

- `/user/login`
- `/user/register`
- `/company/login`
- `/company/register`

### Khu vực User

- `/user-manage/profile`
- `/user-manage/cv/list`

### Khu vực Company

- `/company-manage/profile`
- `/company-manage/job/create`
- `/company-manage/job/list`
- `/company-manage/cv/list`
- `/company-manage/cv/detail/[slug]`

## Quy ước trong dự án

- Dùng alias import `@/*` trỏ đến `src/*`
- Styling bằng Tailwind CSS
- Layout tổng nằm trong `src/app/layout.tsx` (Header + Footer)

## Ghi chú

- Dự án frontend hiện chủ yếu là giao diện và routing.
- Nếu cần tích hợp API backend, có thể thêm biến môi trường trong file `.env.local` (ví dụ: `NEXT_PUBLIC_API_URL=...`).
