import {registerDestructor} from '@ember/destroyable';

type MaybeTeardown = void | (() => void);
type SetupAndTeardown = () => MaybeTeardown;

export function withCleanup(destroyable: object, setupAndTeardown: SetupAndTeardown) {
  let destructor = setupAndTeardown();

  if (destructor) {
    return registerDestructor(destroyable, destructor);
  }

  return;
}

