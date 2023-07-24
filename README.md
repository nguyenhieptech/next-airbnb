# Next13 Airbnb Clone

<img width="1378" alt="image" src="https://github.com/nguyenhieptech/next13-airbnb/assets/48057064/1300d3d8-6e5b-4391-a601-26e1ff0bca8f">

<img width="1372" alt="image" src="https://github.com/nguyenhieptech/next13-airbnb/assets/48057064/826d55c2-ebb8-493a-ad19-e32fe33edeed">

<img width="1370" alt="image" src="https://github.com/nguyenhieptech/next13-airbnb/assets/48057064/9524f992-513a-41de-9afd-972158b28541">


## Adjustments

In this project, there are some differences with [the original source code](https://github.com/AntonioErdeljac/next13-airbnb-clone):

- `@headlessui/react`
- `RTK Query (Redux Toolkit)` instead of using `axios` directly in components/views.
- Naming convention: `login-modal.tsx` instead of `LoginModal.tsx`
- etc.

Note: The current build of this project doesn't work as expected. It failed so many times, both on Vercel and Netlify. So, no demo application for now.

## Getting Started

Install package

```bash
yarn
```

Run the development server

```bash
yarn dev
```

Add environment variables in `.env`. Check `.env.example`

```
DATABASE_URL=
NEXTAUTH_SECRET=

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

## Reference

This project follows this tutorial: https://youtu.be/c_-b_isI4vg
