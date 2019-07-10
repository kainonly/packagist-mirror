import { Mirros } from './mirros';
import { Providers } from './providers';
import { addPackage, addProvider, deletePackage, deleteProvider } from './sync';

const App = () => new Promise(async (resolve) => {
  const mirros = await new Mirros().loadPackages();
  const cosMirror = await new Mirros(true).loadPackages();
  const providers = await new Providers(
    mirros.providers,
    cosMirror.providers,
  ).loadProvider();

  const deletePackageResult = await deletePackage(providers.deletePackage);
  if (!deletePackageResult) {
    resolve('delete packages failed!');
    return;
  }
  const deleteProviderResult = await deleteProvider(providers.deleteProvider);
  if (!deleteProviderResult) {
    resolve('delete providers failed!');
    return;
  }
  const addPackageResult = await addPackage(providers.addPackage);
  if (!addPackageResult) {
    resolve('download packages failed!');
    return;
  }

  const addProvidersResult = await addProvider(providers.addProvider);
  if (!addProvidersResult) {
    resolve('download providers failed!');
    return;
  }

  resolve('mirror sync finish!');
});

export { App };
