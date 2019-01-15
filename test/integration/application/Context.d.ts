import { JWTConfig } from "./Utils";
import { initCtx, devCtx, identityOptions, identitiesCtx } from "../../Context";
/**
 * Create a devCtx with n applications that are configured with all different
 * JWT configs + 1 application that is not configured.
 */
export declare function devWithAllConfigs(init: initCtx): Promise<devCtx>;
export declare function registerIdentitiesForEachApps(init: initCtx, dev: devCtx, configs: JWTConfig[], n: number, options?: identityOptions): Promise<identitiesCtx[]>;
