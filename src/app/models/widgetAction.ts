export class WidgetAction {
  title: string;
  executionFunction: () => Promise<any>;

  constructor(title: string, execution: () => Promise<any>) {
    this.title = title;
    this.executionFunction = execution;
  }

  execute() {
    this.executionFunction()
    .then((result) => {
      console.log(result);
    })
      .catch((error) => {
      console.error(error);
    });
  }
}
