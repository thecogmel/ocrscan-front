

![Website Deploy](https://deploy-badge.vercel.app/?url=http://www.nextjs.org/&name=ocrscan)


# OCR SCAN - Frontend

The [ocrscan-front](https://github.com/thecogmel/ocrscan-front) project is a web application built with Next.js designed for scanning and processing invoices. It uses Optical Character Recognition (OCR) to extract data from uploaded invoices, streamlining the management and analysis of invoice information. The repository includes environment setup, development scripts, and deployment instructions.

## Features

- Login page
- Upload with feedback toasts
- Create user page
- Auth flow
- Render processed items with feedback

## Stacks

**Front-end:** NextJS, TailwindCSS, ReactQuery

**Back-end:** NestJS, PostgreSQL, Tesseract-ocr

**Cloud:** Supabase, Digital Ocean, Vercel

### Running Locally

Clone the project

```bash
git clone https://github.com/thecogmel/ocrscan-front.git
```

Navigate to the project directory

```bash
cd ocrscan-front
```

Install the dependencies

```bash
yarn install
```

Start the server

```bash
yarn dev
```

## Example data

This project is hosted by Vercel in: https://ocrscan-front.vercel.app/


User and password example:
```json
{
    username: admin@user.com,
    password: password
}
```
For the invoice models used, the following model was used:
[Invoice example](https://nvtvaoijcjxlhzspqwdh.supabase.co/storage/v1/object/public/ocr/modelo-invoice.png)

### Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `NEXT_PUBLIC_BASE_URL`: `https://lionfish-app-p4bse.ondigitalocean.app`
- `NEXTAUTH_URL`: `http://localhost:3000/`
- `NEXTAUTH_SECRET`: `bHPEa8QaXqQ4t5Tu+o6c3hI6MI0Mbgk9Vqe930WVvtw=`



## Improvements

Here are some potential improvements that could be implemented in the ocrscan-front project:

- **Social Login Implementation**: Add social login functionality using GitHub and other authentication gateways to simplify user access.
- **Testing**: Develop and integrate tests to ensure the reliability and functionality of the application.
- **Code Refactoring**: Optimize the codebase for better performance and maintainability.
- **Accessibility Enhancements**: Improve accessibility features to make the application more usable for people with disabilities.

## Autor

- [@thecogmel](https://www.github.com/thecogmel)
  
### Feedback

If you have any feedback, please let us know at erick.medeiros.104@ufrn.edu.br.