import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Default configuration used in examples.
 */
export default {
  mnemonic: process.env.MNEMOMIC!,
  ApiURL: "wss://goldberg.avail.tools/ws",
  app_id: 0,
  amount: 10,
  receiver: "5CrSXNLhwwEwUDqRgTsZTU7Ly4HEMa1ES9Bsp67f4iuyVLEj"
}