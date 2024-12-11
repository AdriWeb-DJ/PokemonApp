# PokemonApp

El proyecto trata de un catalogo sobre pokemon.

En este podremos observar los datos de los diferentes pokemons, para ejecutar la aplicacion tendremos que seguir estos pasos:

pimero tendremos que acceder dentro de la carpeta PokemonApp

despues ejecutar los siguientes comandos: 

 installs fnm (Fast Node Manager)
winget install Schniz.fnm

configure fnm environment
fnm env --use-on-cd | Out-String | Invoke-Expression

 download and install Node.js
fnm use --install-if-missing 22

 verifies the right Node.js version is in the environment
node -v # should print `v22.12.0`

 verifies the right npm version is in the environment
npm -v # should print `10.9.0`

una vez hecho esto ya usaremos el comando ng serve, y se iniciará correctamente


## 
























This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
