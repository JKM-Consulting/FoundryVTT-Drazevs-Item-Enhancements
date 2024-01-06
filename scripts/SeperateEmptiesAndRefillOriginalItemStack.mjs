/**
 * Function to detect if a consumable item that is part of a stack greater than one is 
 * in the process of being used. The next charge would be leave the item "empty" and unusable
 * since it has zero charges, even though other items in the stack should have available charges.
 * 
 * This function will detect this case, and seperate the empty item into its own stack of one, then
 * reduce the quantity of the original stack and refill the charges.
 *  
 * Signiture is designed to take dnd5e.itemUsageConsumption hook inputs and process them.
 * https://github.com/foundryvtt/dnd5e/wiki/Hooks
 * @param {Item5e} item 
 * @param {ItemUseConfiguration} config 
 * @param {ItemUseOptions} options 
 * @param {object} usage 
 * @returns 
 */
export default async function seperateEmptiesAndRefillOriginalItemStack(item,config,options,usage) {
  const isAutodestroySet = item?.system?.uses?.autoDestroy || false;
  const isConsumable = item.type==="consumable";

  if(isAutodestroySet || !isConsumable ) return true;
  
  const quantity = item.system.quantity;
  const newCharges = usage.itemUpdates["system.uses.value"]; 
  const maxCharges = item.system.uses.max;

  if(newCharges <= 0 && quantity > 1) {

      //Remove one from existing item stack and assume next item has full charges
      const newEmptyItemStack = item.toObject();
      const newCurrentItemUpdate = {
        "system.uses.value" : maxCharges,
        "system.quantity" : quantity -1
      };

      //Create or Increase stack size of expended item
      usage.itemUpdates = newCurrentItemUpdate;
      newEmptyItemStack.system.quantity = 1;
      newEmptyItemStack.system.uses.value = newCharges;
      await item.actor.createEmbeddedDocuments("Item",[newEmptyItemStack]);
    }
}