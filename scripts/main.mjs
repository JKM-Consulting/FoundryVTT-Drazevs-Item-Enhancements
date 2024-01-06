import seperateEmptiesAndRefillOriginalItemStack from "./SeperateEmptiesAndRefillOriginalItemStack.mjs";

function main() {
  Hooks.on("dnd5e.itemUsageConsumption", seperateEmptiesAndRefillOriginalItemStack);
}

main();
