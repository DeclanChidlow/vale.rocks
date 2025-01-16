<div align="center">
<h1>
  Vale.Rocks
  
  [![Stars](https://img.shields.io/github/stars/DeclanChidlow/vale.rocks?style=flat-square&logoColor=white)](https://github.com/DeclanChidlow/vale.rocks/stargazers)
  [![Forks](https://img.shields.io/github/forks/DeclanChidlow/vale.rocks?style=flat-square&logoColor=white)](https://github.com/DeclanChidlow/vale.rocks/network/members)
  [![Pull Requests](https://img.shields.io/github/issues-pr/DeclanChidlow/vale.rocks?style=flat-square&logoColor=white)](https://github.com/DeclanChidlow/vale.rocks/pulls)
  [![Issues](https://img.shields.io/github/issues/DeclanChidlow/vale.rocks?style=flat-square&logoColor=white)](https://github.com/DeclanChidlow/vale.rocks/issues)
  [![Contributors](https://img.shields.io/github/contributors/DeclanChidlow/vale.rocks?style=flat-square&logoColor=white)](https://github.com/DeclanChidlow/vale.rocks/graphs/contributors)
</h1>
Personal website of Declan Chidlow
</div>
<br/>

A website full of the trials and tribulations of Declan Chidlow. You can view the site live at [vale.rocks](https://vale.rocks).

> [!NOTE]
> I don't accept pull requests on this repository as it is a personal project. However, you are welcome to open [issues](https://github.com/DeclanChidlow/vale.rocks/issues) where necessary.

This site is built using the [Origami programming language](https://weborigami.org). You can read about the design decisions in my post [The Design of This Site](https://vale.rocks/posts/the-design-of-this-site) and about how the site is implemented in [The Implementation of This Site](https://vale.rocks/posts/the-implementation-of-this-site).

## Development

To get started, run the installation command in the root of the repository using your preferred JavaScript tool set:

```console
npm install
```

Once the dependencies are installed, you can run one of the following scripts:

- `start`: Launches the local development server.
- `build`: Generates the site ready for deployment.

Currently, the site is hosted on GitHub Pages. To simplify deployment, a GitHub action is setup which will build and deploy the site from [`gh-pages`](https://github.com/DeclanChidlow/vale.rocks/tree/gh-pages).
