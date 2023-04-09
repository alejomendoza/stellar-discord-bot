import { Discord } from '~/models';
import type { Horizon } from '~/types';

export async function checkRoles(context: any, publickey: string, discord_user_id: string) {
  let server = context.env.horizonURL;
  const account: Horizon.AccountResponse = await (
    await fetch(`${server}/accounts/${publickey}`)
  ).json();
  const balances: Horizon.BalanceLine[] = account.balances;

  //todo: get the roles and assets from the kv store
  let theAssets: Array<Array<string>> = [
    //todo: store this as an envvar
    ["defaultrole", context.env.botpubkey],
  ];
  var metadata = {
    defaultrole: 0,
  };
  //

  function updateMetadata(role: string) {
    switch (role) {
      case "defaultrole":
        metadata.defaultrole = 1;
    }
  }

  try {
    balances.map(async (balance) => {
      for (let asset in theAssets) {
        let AssetCode: string = theAssets[asset][0];
        let AssetIssuer: string = theAssets[asset][1];
        console.log(
          `the asset ${AssetCode}:${AssetIssuer} is being checked against ${JSON.stringify(
            balance
          )}\n`
        );
        if (
          balance.asset_code == AssetCode &&
          balance.asset_issuer == AssetIssuer
        ) {
          console.log(
            `i found the ${AssetCode}:${AssetIssuer} in account ${publickey}`
          );
          updateMetadata(AssetCode);
        }
      }
    });
   return metadata; 

  } catch (err: any) {
    console.error("therewas an error\n", err);
  }
}
