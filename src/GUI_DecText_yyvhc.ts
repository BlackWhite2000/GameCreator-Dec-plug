class GUI_DecText_yyvhc extends GUI_15002 {
  /**
   * 解谜模块位置
   */
  static PLUGIN_MODULE_TYPE_DecText_yyvhc: number = 2

  /**
   * 构造函数
   */
  constructor() {
    super()
    // 标准化
    GUI_DecText_yyvhc.standardList(this.list)
    // 事件监听：当界面显示时
    this.on(EventObject.DISPLAY, this, this.onDisplay)
    // 监听：选中焦点改变事件
    this.list.on(EventObject.CHANGE, this, this.refreshInfo)
  }

  /**
   * 标准化列表LIST
   * -- 键位滚动至可见区域
   */
  static standardList(list: UIList, useItemClickSe: boolean = true): void {
    list.on(EventObject.CHANGE, this, (list: UIList, state: number) => {
      if (state === 0)
        list.scrollTo(list.selectedIndex, true, true, 300, Ease.strongOut)
    }, [list])
    if (useItemClickSe) {
      list.on(UIList.ITEM_CLICK, this, (list: UIList) => {
        GameAudio.playSE(ClientWorld.data.sureSE)
      }, [list])
    }
  }

  // ------------------------------------------------------------------------------------------------------
  // 显示事件
  // ------------------------------------------------------------------------------------------------------
  /**
   * 当界面显示时事件
   */
  private onDisplay() {
    UIList.focus = this.list
    // 获得当前关卡值
    const gn = WorldData.index_yyvhc
    // 获得当前关卡线索集合
    const isIndexs = WorldData.IDS_yyvhc[gn].decIndex.split(',')
    const max = WorldData.objGet_yyvhc.length
    WorldData.objGet_yyvhc = WorldData.objGet_yyvhc.sort()
    const arr = []
    this.list.onCreateItem = Callback.New((ui: GUI_15003, d: ListItem_15003, i: number) => {
      const dec = ui.dec
      if (!d.data)
        return
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const but = GameUI.load(GUI_Dec_yyvhc.PLUGIN_GUI_MONSTER_Dec_yyvhc)[`线索${d.data.id}`]
      dec.label = but.label
      dec.image1 = but.image1
      dec.grid9img1 = but.grid9img1
      dec.image2 = but.image2
      dec.grid9img2 = but.grid9img2
      dec.image3 = but.image3
      dec.grid9img3 = but.grid9img3
      dec.align = but.align
      dec.valign = but.valign
      dec.bold = but.bold
      dec.font = but.font
      dec.color = but.color
      dec.overColor = but.overColor
      dec.smooth = but.smooth
      dec.italic = but.italic
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dec.letterSpacing = but.letterSpacing
      dec.clickColor = but.clickColor
      dec.fontSize = but.fontSize
      dec.textDx = but.textDx
      dec.textDy = but.textDy
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dec.textStroke = but.textStroke
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dec.textStrokeColor = but.textStrokeColor
    }, this)
    for (let i = 0; i < max; i++) {
      const decTextID = Number(WorldData.objGet_yyvhc[i])
      if (!isIndexs.some((v) => {
        return Number(v) === decTextID
      }))
        continue
      // 获取值
      const decTextData: Module_dec_yyvhc = GameData.getModuleData(GUI_DecText_yyvhc.PLUGIN_MODULE_TYPE_DecText_yyvhc, decTextID)
      trace(decTextData)
      // 创建项数据，该项数据的类由系统自动生成
      const d = new ListItem_15003()
      d.data = decTextData
      arr.push(d)
    }
    this.list.items = arr
  }

  /**
   * 显示
   */
  private refreshInfo() {
    const itme = this.list.selectedItem
    if (!itme || !itme.data)
      return
    this.textName.text = itme.data.textName
    this.textC.text = itme.data.textC
  }
}
