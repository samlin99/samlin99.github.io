export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'trip-planner'], name: 'trip-planner', moduleId: 'trip-planner', nav: true, title: 'Trip Planner' }
    ]);

    this.router = router;
  }
}
