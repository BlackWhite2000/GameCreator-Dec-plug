module CommandExecute {
  export function customCommand_15001(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], p: CustomCommandParams_15001): void {
    let id: any
    if (p.decVar === 0)
      id = p.dec.toString()

    else if (p.decVar === 1)
      id = Game.player.variable.getVariable(p.decV).toString()

    else if (p.decVar === 2)
      id = p.decV2.toString()

    if (!WorldData.objGet_yyvhc.some((v) => {
      return v === id
    }))
      WorldData.objGet_yyvhc.push(id)
  }
  export function customCommand_15002(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], p: CustomCommandParams_15002): void {
    const c = (p.decVar === 0 ? p.dec : Game.player.variable.getVariable(p.decV))
    if (c === WorldData.index_yyvhc)
      return
    WorldData.index_yyvhc = c
    const ui = GameUI.load(GUI_Dec_yyvhc.PLUGIN_GUI_MONSTER_Dec_yyvhc) as GUI_Dec_yyvhc
    for (const n in GUI_Dec_yyvhc.dragInDec) {
      ui.goHuan(GUI_Dec_yyvhc.dragInDec[n], true)
      GUI_Dec_yyvhc.dragInDec[n].visible = false
    }
    GUI_Dec_yyvhc.dragInDec = {}
    ui.changeC()
  }
}
