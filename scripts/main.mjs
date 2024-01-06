import seperateEmptiesAndRefillOriginalItemStack from "./SeperateEmptiesAndRefillOriginalItemStack.mjs";

function main() {
  console.log("[drazevs-item-enhancements] Hello World! This code runs immediately when the file is loaded.");

  Hooks.on("init", function() {
    console.log("[drazevs-item-enhancements] This code runs once the Foundry VTT software begins its initialization workflow.");
  });
  
  Hooks.on("ready", function() {
    console.log("[drazevs-item-enhancements] This code runs once core initialization is ready and game data is available.");
  });

  Hooks.on("dnd5e.preItemUsageConsumption",function(item) {
    // debugger;
    console.log("[drazevs-item-enhancements] HookFire: dnd5e.preItemUsageConsumption, itemName:",item.name,", itemId: ",item.id,"itemUuid: ",item.uuid, ", itemType: ",item.type,", Quantity: ",item.system.quantity,", charges: ",item.system.uses.value,", MaxCharges:", item.system.uses.max, ", autodestroy: ",item.system.uses.autoDestroy);
  });

  Hooks.on("dnd5e.itemUsageConsumption", seperateEmptiesAndRefillOriginalItemStack);
}

main();
