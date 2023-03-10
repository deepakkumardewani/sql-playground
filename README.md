#SQL Playground

---

## Project Overview!

This web application is designed to provide an intuitive user interface to easily modify and run **SQL queries** on a database. The application provides a range of functionalities such as **filtering** and **sorting**; It also includes a **manual** as well as an **AI** based **Natural Language** **Query Builder** that allows users to quickly create complex SQL queries. With its powerful features, users can efficiently manage their database with minimal effort.

## Javascript Framework

**Framework of choice**: _VueJS_
**Reason**: Atlan uses VueJS internally and also because I have previous experience working on it.

The other major plugins and packages used are:

## Plugins

| Name          | Description                             |
| ------------- | --------------------------------------- |
| Vuetify       | Vue component framework                 |
| Codemirror    | Code editor component                   |
| Eslint        | Code linter                             |
| Prettier      | Code formatter                          |
| VuetifyLoader | Treeshaking Vuetify components          |
| Webpack       | Module bundler                          |
| Babel         | Javascript compiler                     |
| OpenAI        | Convert natural language to SQL queries |

## Page Load Time

I used Google PageSpeed Insights online tool to analyze the performance of the application, the summary of which is attached below.
![Report](final-report.pdf)

## Optimization

I used an external webpack plugin called **VuetifyLoader** that is helpful in **TreeShaking** the unused components of the Vuetify framework. This helps in reducing the bundle size of the application which in turn decreases the load time and increases performance.
