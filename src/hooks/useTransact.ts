import { BigNumberish, Contract } from "ethers";
import { useCallback, useState } from "react";
import { useProvider, useSigner } from "wagmi";

export const useTransact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const provider = useProvider();
  const { data: signer } = useSigner();

  const transact = useCallback(
    async (
      contract: Contract,
      fn: string,
      args: Array<any>,
      value?: BigNumberish | undefined,
    ) => {
      setIsLoading(true);
      try {
        // const feeData = await provider.getFeeData();
        const data = contract.interface.encodeFunctionData(fn, args);

        const gas = await signer?.estimateGas({
          to: contract.address,
          data,
          value,
        });
        const gasLimit = (Number(gas) * 1.2).toFixed(0);

        const tx = await signer?.sendTransaction({
          to: contract.address,
          data,
          value,
          gasLimit,
          /*
          maxFeePerGas: feeData.maxFeePerGas || undefined,
          maxPriorityFeePerGas: feeData.maxPriorityFeePerGas || undefined,
          type: 2,
          */
        });

        await tx?.wait();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    },
    [provider, signer],
  );

  return {
    transact,
    isLoading,
  };
};
