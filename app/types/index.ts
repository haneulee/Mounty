export namespace Route {
  export interface LoaderArgs {
    request: Request;
    params: Record<string, string>;
  }

  export interface ActionArgs {
    request: Request;
  }

  export interface ComponentProps {
    loaderData: any;
    actionData?: any;
  }

  export type MetaFunction = () => Array<{
    [key: string]: string | undefined;
  }>;
}
