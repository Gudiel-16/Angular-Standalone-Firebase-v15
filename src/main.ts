import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';

// Configuracion para trabajar con componentes y no con modulos
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(
      provideFirebaseApp( () => initializeApp(environment.firebase))
    ),
    importProvidersFrom(provideFirestore(() => getFirestore()))
  ]
});

// Configuracion anterior

// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app/app.module';
// platformBrowserDynamic().bootstrapModule(AppModule)
  //   .catch(err => console.error(err));
  