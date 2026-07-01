/**
 * 菩提道次第广论 完整科判结构树
 * 宗喀巴大师 造，法尊法师 译
 *
 * 结构说明：
 * - 甲级：大科（甲一、甲二）
 * - 乙级：乙一至乙四（开为四门）
 * - 丙级及以下：逐步细分
 *
 * ID 命名规则：'part1' 为甲一，'part2' 为甲二，
 * 'part2-1' 为乙一，'part2-1-1' 为丙一，以此类推
 */

export default {
  id: 'root',
  title: '菩提道次第广论',
  author: '宗喀巴大师 造，法尊法师 译',
  children: [
    // ============================================================
    // 甲一：归敬颂及造论宗旨
    // ============================================================
    {
      id: 'part1',
      level: '甲',
      number: '甲一',
      title: '归敬颂及略述本论之重要',
      children: []
    },

    // ============================================================
    // 甲二：正论（开为四门）
    // ============================================================
    {
      id: 'part2',
      level: '甲',
      number: '甲二',
      title: '正论——开为四门',
      children: [
        // --------------------------------------------------------
        // 乙一：为显其法根源净故开示造者殊胜
        // --------------------------------------------------------
        {
          id: 'part2-1',
          level: '乙',
          number: '乙一',
          title: '为显其法根源净故开示造者殊胜',
          children: [
            {
              id: 'part2-1-1',
              level: '丙',
              number: '丙一',
              title: '圆满种中受生事理',
              children: []
            },
            {
              id: 'part2-1-2',
              level: '丙',
              number: '丙二',
              title: '其身获得功德事理',
              children: [
                {
                  id: 'part2-1-2-1',
                  level: '丁',
                  number: '丁一',
                  title: '知见广博获教功德事理',
                  children: []
                },
                {
                  id: 'part2-1-2-2',
                  level: '丁',
                  number: '丁二',
                  title: '如理修行获证功德事理',
                  children: []
                }
              ]
            },
            {
              id: 'part2-1-3',
              level: '丙',
              number: '丙三',
              title: '得已于教所作事业',
              children: [
                {
                  id: 'part2-1-3-1',
                  level: '丁',
                  number: '丁一',
                  title: '于印度所作事理',
                  children: []
                },
                {
                  id: 'part2-1-3-2',
                  level: '丁',
                  number: '丁二',
                  title: '藏中所作事理',
                  children: []
                }
              ]
            }
          ]
        },

        // --------------------------------------------------------
        // 乙二：令于教授起敬重故开示其法殊胜
        // --------------------------------------------------------
        {
          id: 'part2-2',
          level: '乙',
          number: '乙二',
          title: '令于教授起敬重故开示其法殊胜',
          children: [
            {
              id: 'part2-2-1',
              level: '丙',
              number: '丙一',
              title: '通达一切圣教无违殊胜',
              children: []
            },
            {
              id: 'part2-2-2',
              level: '丙',
              number: '丙二',
              title: '一切圣言现为教授殊胜',
              children: []
            },
            {
              id: 'part2-2-3',
              level: '丙',
              number: '丙三',
              title: '易于获得胜者密意殊胜',
              children: []
            },
            {
              id: 'part2-2-4',
              level: '丙',
              number: '丙四',
              title: '极大罪行自趣消灭殊胜',
              children: []
            }
          ]
        },

        // --------------------------------------------------------
        // 乙三：如何讲闻二种殊胜相应正法
        // --------------------------------------------------------
        {
          id: 'part2-3',
          level: '乙',
          number: '乙三',
          title: '如何讲闻二种殊胜相应正法',
          children: [
            {
              id: 'part2-3-1',
              level: '丙',
              number: '丙一',
              title: '听闻轨理',
              children: [
                {
                  id: 'part2-3-1-1',
                  level: '丁',
                  number: '丁一',
                  title: '思惟闻法所有胜利',
                  children: []
                },
                {
                  id: 'part2-3-1-2',
                  level: '丁',
                  number: '丁二',
                  title: '于法法师发起承事',
                  children: []
                },
                {
                  id: 'part2-3-1-3',
                  level: '丁',
                  number: '丁三',
                  title: '正听轨理',
                  children: [
                    {
                      id: 'part2-3-1-3-1',
                      level: '戊',
                      number: '戊一',
                      title: '断器三过',
                      children: []
                    },
                    {
                      id: 'part2-3-1-3-2',
                      level: '戊',
                      number: '戊二',
                      title: '依六种想',
                      children: []
                    }
                  ]
                }
              ]
            },
            {
              id: 'part2-3-2',
              level: '丙',
              number: '丙二',
              title: '讲说轨理',
              children: [
                {
                  id: 'part2-3-2-1',
                  level: '丁',
                  number: '丁一',
                  title: '思惟说法所有胜利',
                  children: []
                },
                {
                  id: 'part2-3-2-2',
                  level: '丁',
                  number: '丁二',
                  title: '发起承事大师及法',
                  children: []
                },
                {
                  id: 'part2-3-2-3',
                  level: '丁',
                  number: '丁三',
                  title: '以何意乐加行而说',
                  children: []
                },
                {
                  id: 'part2-3-2-4',
                  level: '丁',
                  number: '丁四',
                  title: '于何等境应说不说所有差别',
                  children: []
                }
              ]
            },
            {
              id: 'part2-3-3',
              level: '丙',
              number: '丙三',
              title: '于完结时共作轨理',
              children: []
            }
          ]
        },

        // --------------------------------------------------------
        // 乙四：如何正以教授引导学徒之次第（道之主体）
        // --------------------------------------------------------
        {
          id: 'part2-4',
          level: '乙',
          number: '乙四',
          title: '如何正以教授引导学徒之次第',
          children: [

            // ================================================
            // 丙一：道之根本——亲近知识轨理（道前基础）
            // ================================================
            {
              id: 'part2-4-1',
              level: '丙',
              number: '丙一',
              title: '道之根本——亲近知识轨理',
              children: [
                {
                  id: 'part2-4-1-1',
                  level: '丁',
                  number: '丁一',
                  title: '令发定解故稍开宣说',
                  children: [
                    {
                      id: 'part2-4-1-1-1',
                      level: '戊',
                      number: '戊一',
                      title: '所依善知识之相',
                      children: []
                    },
                    {
                      id: 'part2-4-1-1-2',
                      level: '戊',
                      number: '戊二',
                      title: '能依学者之相',
                      children: []
                    },
                    {
                      id: 'part2-4-1-1-3',
                      level: '戊',
                      number: '戊三',
                      title: '彼应如何依师之理',
                      children: [
                        {
                          id: 'part2-4-1-1-3-1',
                          level: '己',
                          number: '己一',
                          title: '意乐亲近轨理',
                          children: [
                            {
                              id: 'part2-4-1-1-3-1-1',
                              level: '庚',
                              number: '庚一',
                              title: '总示亲近意乐',
                              children: []
                            },
                            {
                              id: 'part2-4-1-1-3-1-2',
                              level: '庚',
                              number: '庚二',
                              title: '特申修信以为根本',
                              children: []
                            },
                            {
                              id: 'part2-4-1-1-3-1-3',
                              level: '庚',
                              number: '庚三',
                              title: '随念深恩应起敬重',
                              children: []
                            }
                          ]
                        },
                        {
                          id: 'part2-4-1-1-3-2',
                          level: '己',
                          number: '己二',
                          title: '加行亲近轨理',
                          children: []
                        }
                      ]
                    },
                    {
                      id: 'part2-4-1-1-4',
                      level: '戊',
                      number: '戊四',
                      title: '依止胜利',
                      children: []
                    },
                    {
                      id: 'part2-4-1-1-5',
                      level: '戊',
                      number: '戊五',
                      title: '未依过患',
                      children: []
                    },
                    {
                      id: 'part2-4-1-1-6',
                      level: '戊',
                      number: '戊六',
                      title: '摄彼等义',
                      children: []
                    }
                  ]
                },
                {
                  id: 'part2-4-1-2',
                  level: '丁',
                  number: '丁二',
                  title: '总略宣说修持轨理',
                  children: [
                    {
                      id: 'part2-4-1-2-1',
                      level: '戊',
                      number: '戊一',
                      title: '正明修法',
                      children: [
                        {
                          id: 'part2-4-1-2-1-1',
                          level: '己',
                          number: '己一',
                          title: '正修时应如何',
                          children: [
                            {
                              id: 'part2-4-1-2-1-1-1',
                              level: '庚',
                              number: '庚一',
                              title: '加行',
                              children: []
                            },
                            {
                              id: 'part2-4-1-2-1-1-2',
                              level: '庚',
                              number: '庚二',
                              title: '正行',
                              children: [
                                {
                                  id: 'part2-4-1-2-1-1-2-1',
                                  level: '辛',
                                  number: '辛一',
                                  title: '总共修法',
                                  children: []
                                },
                                {
                                  id: 'part2-4-1-2-1-1-2-2',
                                  level: '辛',
                                  number: '辛二',
                                  title: '此处修法',
                                  children: []
                                }
                              ]
                            },
                            {
                              id: 'part2-4-1-2-1-1-3',
                              level: '庚',
                              number: '庚三',
                              title: '完结',
                              children: []
                            }
                          ]
                        },
                        {
                          id: 'part2-4-1-2-1-2',
                          level: '己',
                          number: '己二',
                          title: '未修中间应如何',
                          children: []
                        }
                      ]
                    },
                    {
                      id: 'part2-4-1-2-2',
                      level: '戊',
                      number: '戊二',
                      title: '破除此中邪妄分别',
                      children: []
                    }
                  ]
                }
              ]
            },

            // ================================================
            // 丙二：既亲近已如何修心次第
            // ================================================
            {
              id: 'part2-4-2',
              level: '丙',
              number: '丙二',
              title: '既亲近已如何修心次第',
              children: [
                // 丁一：于有暇身劝取心要
                {
                  id: 'part2-4-2-1',
                  level: '丁',
                  number: '丁一',
                  title: '于有暇身劝取心要',
                  children: [
                    {
                      id: 'part2-4-2-1-1',
                      level: '戊',
                      number: '戊一',
                      title: '正明暇满',
                      children: [
                        {
                          id: 'part2-4-2-1-1-1',
                          level: '己',
                          number: '己一',
                          title: '闲暇',
                          children: []
                        },
                        {
                          id: 'part2-4-2-1-1-2',
                          level: '己',
                          number: '己二',
                          title: '圆满',
                          children: []
                        }
                      ]
                    },
                    {
                      id: 'part2-4-2-1-2',
                      level: '戊',
                      number: '戊二',
                      title: '明其义大',
                      children: []
                    },
                    {
                      id: 'part2-4-2-1-3',
                      level: '戊',
                      number: '戊三',
                      title: '思惟难得',
                      children: []
                    }
                  ]
                },
                // 丁二：如何摄取心要之理
                {
                  id: 'part2-4-2-2',
                  level: '丁',
                  number: '丁二',
                  title: '如何摄取心要之理',
                  children: [
                    // 戊一：于道总建立发决定解
                    {
                      id: 'part2-4-2-2-1',
                      level: '戊',
                      number: '戊一',
                      title: '于道总建立发决定解',
                      children: [
                        {
                          id: 'part2-4-2-2-1-1',
                          level: '己',
                          number: '己一',
                          title: '三士道中总摄一切至言之理',
                          children: []
                        },
                        {
                          id: 'part2-4-2-2-1-2',
                          level: '己',
                          number: '己二',
                          title: '显示由三士门如次引导之因相',
                          children: [
                            {
                              id: 'part2-4-2-2-1-2-1',
                              level: '庚',
                              number: '庚一',
                              title: '显示何为由三士道引导之义',
                              children: []
                            },
                            {
                              id: 'part2-4-2-2-1-2-2',
                              level: '庚',
                              number: '庚二',
                              title: '如是次第引导之因相',
                              children: [
                                {
                                  id: 'part2-4-2-2-1-2-2-1',
                                  level: '辛',
                                  number: '辛一',
                                  title: '正明因相',
                                  children: []
                                },
                                {
                                  id: 'part2-4-2-2-1-2-2-2',
                                  level: '辛',
                                  number: '辛二',
                                  title: '所为义',
                                  children: []
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    // 戊二：正于彼道取心要之理（三士道）
                    {
                      id: 'part2-4-2-2-2',
                      level: '戊',
                      number: '戊二',
                      title: '正于彼道取心要之理',
                      children: [

                        // ====================================
                        // 己一：共下士道
                        // ====================================
                        {
                          id: 'part2-4-2-2-2-1',
                          level: '己',
                          number: '己一',
                          title: '于共下士道次修心',
                          children: [
                            // 庚一：正修下士意乐
                            {
                              id: 'part2-4-2-2-2-1-1',
                              level: '庚',
                              number: '庚一',
                              title: '正修下士意乐',
                              children: [
                                // 辛一：发生希求后世之心
                                {
                                  id: 'part2-4-2-2-2-1-1-1',
                                  level: '辛',
                                  number: '辛一',
                                  title: '发生希求后世之心',
                                  children: [
                                    // 壬一：思惟此世不能久住忆念必死（念死无常）
                                    {
                                      id: 'part2-4-2-2-2-1-1-1-1',
                                      level: '壬',
                                      number: '壬一',
                                      title: '思惟此世不能久住忆念必死',
                                      children: [
                                        {
                                          id: 'part2-4-2-2-2-1-1-1-1-1',
                                          level: '癸',
                                          number: '癸一',
                                          title: '未修念死所有过患',
                                          children: []
                                        },
                                        {
                                          id: 'part2-4-2-2-2-1-1-1-1-2',
                                          level: '癸',
                                          number: '癸二',
                                          title: '修习胜利',
                                          children: []
                                        },
                                        {
                                          id: 'part2-4-2-2-2-1-1-1-1-3',
                                          level: '癸',
                                          number: '癸三',
                                          title: '当发何等念死之心',
                                          children: []
                                        },
                                        {
                                          id: 'part2-4-2-2-2-1-1-1-1-4',
                                          level: '癸',
                                          number: '癸四',
                                          title: '修念死理',
                                          children: [
                                            {
                                              id: 'part2-4-2-2-2-1-1-1-1-4-1',
                                              level: '子',
                                              number: '子一',
                                              title: '思决定死',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-1-1-1-1-4-2',
                                              level: '子',
                                              number: '子二',
                                              title: '思惟死无定期',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-1-1-1-1-4-3',
                                              level: '子',
                                              number: '子三',
                                              title: '思惟死时除法而外余皆无益',
                                              children: []
                                            }
                                          ]
                                        }
                                      ]
                                    },
                                    // 壬二：思惟后世当生何趣二趣苦乐（三恶趣苦）
                                    {
                                      id: 'part2-4-2-2-2-1-1-1-2',
                                      level: '壬',
                                      number: '壬二',
                                      title: '思惟后世当生何趣二趣苦乐',
                                      children: [
                                        {
                                          id: 'part2-4-2-2-2-1-1-1-2-1',
                                          level: '癸',
                                          number: '癸一',
                                          title: '思惟地狱所有众苦',
                                          children: [
                                            {
                                              id: 'part2-4-2-2-2-1-1-1-2-1-1',
                                              level: '子',
                                              number: '子一',
                                              title: '大有情地狱',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-1-1-1-2-1-2',
                                              level: '子',
                                              number: '子二',
                                              title: '近边地狱',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-1-1-1-2-1-3',
                                              level: '子',
                                              number: '子三',
                                              title: '寒冷地狱',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-1-1-1-2-1-4',
                                              level: '子',
                                              number: '子四',
                                              title: '独一地狱',
                                              children: []
                                            }
                                          ]
                                        },
                                        {
                                          id: 'part2-4-2-2-2-1-1-1-2-2',
                                          level: '癸',
                                          number: '癸二',
                                          title: '旁生所有众苦',
                                          children: []
                                        },
                                        {
                                          id: 'part2-4-2-2-2-1-1-1-2-3',
                                          level: '癸',
                                          number: '癸三',
                                          title: '饿鬼所有众苦',
                                          children: []
                                        }
                                      ]
                                    }
                                  ]
                                },
                                // 辛二：依止后世安乐方便（皈依 + 业果）
                                {
                                  id: 'part2-4-2-2-2-1-1-2',
                                  level: '辛',
                                  number: '辛二',
                                  title: '依止后世安乐方便',
                                  children: [
                                    // 壬一：皈依三宝
                                    {
                                      id: 'part2-4-2-2-2-1-1-2-1',
                                      level: '壬',
                                      number: '壬一',
                                      title: '趣入圣教最胜之门净修归依',
                                      children: [
                                        {
                                          id: 'part2-4-2-2-2-1-1-2-1-1',
                                          level: '癸',
                                          number: '癸一',
                                          title: '由依何事为归依因',
                                          children: []
                                        },
                                        {
                                          id: 'part2-4-2-2-2-1-1-2-1-2',
                                          level: '癸',
                                          number: '癸二',
                                          title: '由依彼故所归之境',
                                          children: [
                                            {
                                              id: 'part2-4-2-2-2-1-1-2-1-2-1',
                                              level: '子',
                                              number: '子一',
                                              title: '正明其境',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-1-1-2-1-2-2',
                                              level: '子',
                                              number: '子二',
                                              title: '应归依此之因相',
                                              children: []
                                            }
                                          ]
                                        },
                                        {
                                          id: 'part2-4-2-2-2-1-1-2-1-3',
                                          level: '癸',
                                          number: '癸三',
                                          title: '由何道理而正归依',
                                          children: [
                                            {
                                              id: 'part2-4-2-2-2-1-1-2-1-3-1',
                                              level: '子',
                                              number: '子一',
                                              title: '知功德',
                                              children: [
                                                {
                                                  id: 'part2-4-2-2-2-1-1-2-1-3-1-1',
                                                  level: '丑',
                                                  number: '丑一',
                                                  title: '佛功德',
                                                  children: []
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-1-1-2-1-3-1-2',
                                                  level: '丑',
                                                  number: '丑二',
                                                  title: '法功德',
                                                  children: []
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-1-1-2-1-3-1-3',
                                                  level: '丑',
                                                  number: '丑三',
                                                  title: '僧功德',
                                                  children: []
                                                }
                                              ]
                                            },
                                            {
                                              id: 'part2-4-2-2-2-1-1-2-1-3-2',
                                              level: '子',
                                              number: '子二',
                                              title: '知差别',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-1-1-2-1-3-3',
                                              level: '子',
                                              number: '子三',
                                              title: '自誓受',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-1-1-2-1-3-4',
                                              level: '子',
                                              number: '子四',
                                              title: '不言有余而正归依',
                                              children: []
                                            }
                                          ]
                                        },
                                        {
                                          id: 'part2-4-2-2-2-1-1-2-1-4',
                                          level: '癸',
                                          number: '癸四',
                                          title: '既归依已所学次第',
                                          children: [
                                            {
                                              id: 'part2-4-2-2-2-1-1-2-1-4-1',
                                              level: '子',
                                              number: '子一',
                                              title: '摄分中出',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-1-1-2-1-4-2',
                                              level: '子',
                                              number: '子二',
                                              title: '教授中出',
                                              children: [
                                                {
                                                  id: 'part2-4-2-2-2-1-1-2-1-4-2-1',
                                                  level: '丑',
                                                  number: '丑一',
                                                  title: '别学',
                                                  children: [
                                                    {
                                                      id: 'part2-4-2-2-2-1-1-2-1-4-2-1-1',
                                                      level: '寅',
                                                      number: '寅一',
                                                      title: '遮止应学',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-1-1-2-1-4-2-1-2',
                                                      level: '寅',
                                                      number: '寅二',
                                                      title: '修行应学',
                                                      children: []
                                                    }
                                                  ]
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-1-1-2-1-4-2-2',
                                                  level: '丑',
                                                  number: '丑二',
                                                  title: '共学',
                                                  children: []
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    },
                                    // 壬二：业果
                                    {
                                      id: 'part2-4-2-2-2-1-1-2-2',
                                      level: '壬',
                                      number: '壬二',
                                      title: '一切善乐所有根本发深忍信',
                                      children: [
                                        {
                                          id: 'part2-4-2-2-2-1-1-2-2-1',
                                          level: '癸',
                                          number: '癸一',
                                          title: '思总业果',
                                          children: [
                                            {
                                              id: 'part2-4-2-2-2-1-1-2-2-1-1',
                                              level: '子',
                                              number: '子一',
                                              title: '正明思总之理',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-1-1-2-2-1-2',
                                              level: '子',
                                              number: '子二',
                                              title: '分别思惟',
                                              children: [
                                                {
                                                  id: 'part2-4-2-2-2-1-1-2-2-1-2-1',
                                                  level: '丑',
                                                  number: '丑一',
                                                  title: '显十业道而为上首',
                                                  children: []
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-1-1-2-2-1-2-2',
                                                  level: '丑',
                                                  number: '丑二',
                                                  title: '抉择业果',
                                                  children: [
                                                    {
                                                      id: 'part2-4-2-2-2-1-1-2-2-1-2-2-1',
                                                      level: '寅',
                                                      number: '寅一',
                                                      title: '显示黑业果',
                                                      children: [
                                                        {
                                                          id: 'part2-4-2-2-2-1-1-2-2-1-2-2-1-1',
                                                          level: '卯',
                                                          number: '卯一',
                                                          title: '正显示黑业道',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-1-1-2-2-1-2-2-1-2',
                                                          level: '卯',
                                                          number: '卯二',
                                                          title: '轻重差别',
                                                          children: [
                                                            {
                                                              id: 'part2-4-2-2-2-1-1-2-2-1-2-2-1-2-1',
                                                              level: '辰',
                                                              number: '辰一',
                                                              title: '十业道轻重',
                                                              children: []
                                                            },
                                                            {
                                                              id: 'part2-4-2-2-2-1-1-2-2-1-2-2-1-2-2',
                                                              level: '辰',
                                                              number: '辰二',
                                                              title: '兼略显示具力业门',
                                                              children: []
                                                            }
                                                          ]
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-1-1-2-2-1-2-2-1-3',
                                                          level: '卯',
                                                          number: '卯三',
                                                          title: '此等之果',
                                                          children: []
                                                        }
                                                      ]
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-1-1-2-2-1-2-2-2',
                                                      level: '寅',
                                                      number: '寅二',
                                                      title: '白业果',
                                                      children: [
                                                        {
                                                          id: 'part2-4-2-2-2-1-1-2-2-1-2-2-2-1',
                                                          level: '卯',
                                                          number: '卯一',
                                                          title: '白业',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-1-1-2-2-1-2-2-2-2',
                                                          level: '卯',
                                                          number: '卯二',
                                                          title: '果',
                                                          children: []
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                }
                                              ]
                                            }
                                          ]
                                        },
                                        {
                                          id: 'part2-4-2-2-2-1-1-2-2-2',
                                          level: '癸',
                                          number: '癸二',
                                          title: '思别业果',
                                          children: [
                                            {
                                              id: 'part2-4-2-2-2-1-1-2-2-2-1',
                                              level: '子',
                                              number: '子一',
                                              title: '异熟功德',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-1-1-2-2-2-2',
                                              level: '子',
                                              number: '子二',
                                              title: '异熟果报',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-1-1-2-2-2-3',
                                              level: '子',
                                              number: '子三',
                                              title: '异熟因缘',
                                              children: []
                                            }
                                          ]
                                        },
                                        {
                                          id: 'part2-4-2-2-2-1-1-2-2-3',
                                          level: '癸',
                                          number: '癸三',
                                          title: '思已正行进止之理',
                                          children: [
                                            {
                                              id: 'part2-4-2-2-2-1-1-2-2-3-1',
                                              level: '子',
                                              number: '子一',
                                              title: '总示',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-1-1-2-2-3-2',
                                              level: '子',
                                              number: '子二',
                                              title: '特以四力净修道理',
                                              children: []
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            },
                            // 庚二：发此意乐之量
                            {
                              id: 'part2-4-2-2-2-1-2',
                              level: '庚',
                              number: '庚二',
                              title: '发此意乐之量',
                              children: []
                            },
                            // 庚三：除遣此中邪执
                            {
                              id: 'part2-4-2-2-2-1-3',
                              level: '庚',
                              number: '庚三',
                              title: '除遣此中邪执',
                              children: []
                            }
                          ]
                        },

                        // ====================================
                        // 己二：共中士道
                        // ====================================
                        {
                          id: 'part2-4-2-2-2-2',
                          level: '己',
                          number: '己二',
                          title: '于共中士道次修心',
                          children: [
                            // 庚一：正修意乐
                            {
                              id: 'part2-4-2-2-2-2-1',
                              level: '庚',
                              number: '庚一',
                              title: '正修意乐',
                              children: [
                                // 辛一：明求解脱之心
                                {
                                  id: 'part2-4-2-2-2-2-1-1',
                                  level: '辛',
                                  number: '辛一',
                                  title: '明求解脱之心',
                                  children: []
                                },
                                // 辛二：发此之方便
                                {
                                  id: 'part2-4-2-2-2-2-1-2',
                                  level: '辛',
                                  number: '辛二',
                                  title: '发此之方便',
                                  children: [
                                    // 壬一：由于苦集门中思惟
                                    {
                                      id: 'part2-4-2-2-2-2-1-2-1',
                                      level: '壬',
                                      number: '壬一',
                                      title: '由于苦集门中思惟',
                                      children: [
                                        // 癸一：思惟苦谛生死过患
                                        {
                                          id: 'part2-4-2-2-2-2-1-2-1-1',
                                          level: '癸',
                                          number: '癸一',
                                          title: '思惟苦谛生死过患',
                                          children: [
                                            {
                                              id: 'part2-4-2-2-2-2-1-2-1-1-1',
                                              level: '子',
                                              number: '子一',
                                              title: '显示四谛先谈苦谛之意趣',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-2-1-2-1-1-2',
                                              level: '子',
                                              number: '子二',
                                              title: '正修苦谛',
                                              children: [
                                                {
                                                  id: 'part2-4-2-2-2-2-1-2-1-1-2-1',
                                                  level: '丑',
                                                  number: '丑一',
                                                  title: '思惟生死总苦',
                                                  children: [
                                                    {
                                                      id: 'part2-4-2-2-2-2-1-2-1-1-2-1-1',
                                                      level: '寅',
                                                      number: '寅一',
                                                      title: '思惟八苦',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-2-1-2-1-1-2-1-2',
                                                      level: '寅',
                                                      number: '寅二',
                                                      title: '思惟六苦',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-2-1-2-1-1-2-1-3',
                                                      level: '寅',
                                                      number: '寅三',
                                                      title: '思惟三苦',
                                                      children: []
                                                    }
                                                  ]
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-2-1-2-1-1-2-2',
                                                  level: '丑',
                                                  number: '丑二',
                                                  title: '思惟别苦',
                                                  children: [
                                                    {
                                                      id: 'part2-4-2-2-2-2-1-2-1-1-2-2-1',
                                                      level: '寅',
                                                      number: '寅一',
                                                      title: '三恶趣苦',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-2-1-2-1-1-2-2-2',
                                                      level: '寅',
                                                      number: '寅二',
                                                      title: '人苦',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-2-1-2-1-1-2-2-3',
                                                      level: '寅',
                                                      number: '寅三',
                                                      title: '非天苦',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-2-1-2-1-1-2-2-4',
                                                      level: '寅',
                                                      number: '寅四',
                                                      title: '天苦',
                                                      children: [
                                                        {
                                                          id: 'part2-4-2-2-2-2-1-2-1-1-2-2-4-1',
                                                          level: '卯',
                                                          number: '卯一',
                                                          title: '欲天三苦',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-2-1-2-1-1-2-2-4-2',
                                                          level: '卯',
                                                          number: '卯二',
                                                          title: '上二界粗重苦',
                                                          children: []
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                }
                                              ]
                                            }
                                          ]
                                        },
                                        // 癸二：思惟集谛流转次第
                                        {
                                          id: 'part2-4-2-2-2-2-1-2-1-2',
                                          level: '癸',
                                          number: '癸二',
                                          title: '思惟集谛流转次第',
                                          children: [
                                            {
                                              id: 'part2-4-2-2-2-2-1-2-1-2-1',
                                              level: '子',
                                              number: '子一',
                                              title: '烦恼发生之理',
                                              children: [
                                                {
                                                  id: 'part2-4-2-2-2-2-1-2-1-2-1-1',
                                                  level: '丑',
                                                  number: '丑一',
                                                  title: '正明烦恼',
                                                  children: []
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-2-1-2-1-2-1-2',
                                                  level: '丑',
                                                  number: '丑二',
                                                  title: '如何生起之次第',
                                                  children: []
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-2-1-2-1-2-1-3',
                                                  level: '丑',
                                                  number: '丑三',
                                                  title: '烦恼之因',
                                                  children: []
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-2-1-2-1-2-1-4',
                                                  level: '丑',
                                                  number: '丑四',
                                                  title: '烦恼过患',
                                                  children: []
                                                }
                                              ]
                                            },
                                            {
                                              id: 'part2-4-2-2-2-2-1-2-1-2-2',
                                              level: '子',
                                              number: '子二',
                                              title: '彼集业之理',
                                              children: [
                                                {
                                                  id: 'part2-4-2-2-2-2-1-2-1-2-2-1',
                                                  level: '丑',
                                                  number: '丑一',
                                                  title: '正明所集之业',
                                                  children: [
                                                    {
                                                      id: 'part2-4-2-2-2-2-1-2-1-2-2-1-1',
                                                      level: '寅',
                                                      number: '寅一',
                                                      title: '思业',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-2-1-2-1-2-2-1-2',
                                                      level: '寅',
                                                      number: '寅二',
                                                      title: '思已业',
                                                      children: []
                                                    }
                                                  ]
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-2-1-2-1-2-2-2',
                                                  level: '丑',
                                                  number: '丑二',
                                                  title: '如何集业之理',
                                                  children: []
                                                }
                                              ]
                                            },
                                            {
                                              id: 'part2-4-2-2-2-2-1-2-1-2-3',
                                              level: '子',
                                              number: '子三',
                                              title: '死没及结生之理',
                                              children: [
                                                {
                                                  id: 'part2-4-2-2-2-2-1-2-1-2-3-1',
                                                  level: '丑',
                                                  number: '丑一',
                                                  title: '死缘',
                                                  children: []
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-2-1-2-1-2-3-2',
                                                  level: '丑',
                                                  number: '丑二',
                                                  title: '死心',
                                                  children: []
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-2-1-2-1-2-3-3',
                                                  level: '丑',
                                                  number: '丑三',
                                                  title: '从何摄暖',
                                                  children: []
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-2-1-2-1-2-3-4',
                                                  level: '丑',
                                                  number: '丑四',
                                                  title: '死后成办中有之理',
                                                  children: []
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-2-1-2-1-2-3-5',
                                                  level: '丑',
                                                  number: '丑五',
                                                  title: '次于生有受生道理',
                                                  children: []
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    },
                                    // 壬二：由于十二缘起思惟
                                    {
                                      id: 'part2-4-2-2-2-2-1-2-2',
                                      level: '壬',
                                      number: '壬二',
                                      title: '由于十二缘起思惟',
                                      children: [
                                        {
                                          id: 'part2-4-2-2-2-2-1-2-2-1',
                                          level: '癸',
                                          number: '癸一',
                                          title: '支分差别',
                                          children: []
                                        },
                                        {
                                          id: 'part2-4-2-2-2-2-1-2-2-2',
                                          level: '癸',
                                          number: '癸二',
                                          title: '支分略摄',
                                          children: []
                                        },
                                        {
                                          id: 'part2-4-2-2-2-2-1-2-2-3',
                                          level: '癸',
                                          number: '癸三',
                                          title: '几世圆满',
                                          children: []
                                        },
                                        {
                                          id: 'part2-4-2-2-2-2-1-2-2-4',
                                          level: '癸',
                                          number: '癸四',
                                          title: '此等摄义',
                                          children: []
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            },
                            // 庚二：彼生起之量
                            {
                              id: 'part2-4-2-2-2-2-2',
                              level: '庚',
                              number: '庚二',
                              title: '彼生起之量',
                              children: []
                            },
                            // 庚三：除遣于此邪执分别
                            {
                              id: 'part2-4-2-2-2-2-3',
                              level: '庚',
                              number: '庚三',
                              title: '除遣于此邪执分别',
                              children: []
                            },
                            // 庚四：抉择能趣解脱道性
                            {
                              id: 'part2-4-2-2-2-2-4',
                              level: '庚',
                              number: '庚四',
                              title: '抉择能趣解脱道性',
                              children: [
                                {
                                  id: 'part2-4-2-2-2-2-4-1',
                                  level: '辛',
                                  number: '辛一',
                                  title: '以何等身灭除',
                                  children: []
                                },
                                {
                                  id: 'part2-4-2-2-2-2-4-2',
                                  level: '辛',
                                  number: '辛二',
                                  title: '修何等道而为灭除',
                                  children: []
                                }
                              ]
                            }
                          ]
                        },

                        // ====================================
                        // 己三：上士道
                        // ====================================
                        {
                          id: 'part2-4-2-2-2-3',
                          level: '己',
                          number: '己三',
                          title: '于上士道次修心',
                          children: [
                            // 庚一：显示入大乘门惟是发心
                            {
                              id: 'part2-4-2-2-2-3-1',
                              level: '庚',
                              number: '庚一',
                              title: '显示入大乘门惟是发心',
                              children: []
                            },
                            // 庚二：如何发生此心道理（菩提心教授）
                            {
                              id: 'part2-4-2-2-2-3-2',
                              level: '庚',
                              number: '庚二',
                              title: '如何发生此心道理',
                              children: [
                                {
                                  id: 'part2-4-2-2-2-3-2-1',
                                  level: '辛',
                                  number: '辛一',
                                  title: '由依何因如何生起',
                                  children: []
                                },
                                {
                                  id: 'part2-4-2-2-2-3-2-2',
                                  level: '辛',
                                  number: '辛二',
                                  title: '修菩提心次第',
                                  children: [
                                    // 壬一：七种因果教授
                                    {
                                      id: 'part2-4-2-2-2-3-2-2-1',
                                      level: '壬',
                                      number: '壬一',
                                      title: '修七种因果教授',
                                      children: [
                                        {
                                          id: 'part2-4-2-2-2-3-2-2-1-1',
                                          level: '癸',
                                          number: '癸一',
                                          title: '于其渐次令发定解',
                                          children: [
                                            {
                                              id: 'part2-4-2-2-2-3-2-2-1-1-1',
                                              level: '子',
                                              number: '子一',
                                              title: '开示大乘道之根本即是大悲',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-3-2-2-1-1-2',
                                              level: '子',
                                              number: '子二',
                                              title: '诸余因果是此因果道理',
                                              children: []
                                            }
                                          ]
                                        },
                                        {
                                          id: 'part2-4-2-2-2-3-2-2-1-2',
                                          level: '癸',
                                          number: '癸二',
                                          title: '如次正修',
                                          children: [
                                            {
                                              id: 'part2-4-2-2-2-3-2-2-1-2-1',
                                              level: '子',
                                              number: '子一',
                                              title: '修习希求利他之心',
                                              children: [
                                                {
                                                  id: 'part2-4-2-2-2-3-2-2-1-2-1-1',
                                                  level: '丑',
                                                  number: '丑一',
                                                  title: '引发生起此心所依',
                                                  children: [
                                                    {
                                                      id: 'part2-4-2-2-2-3-2-2-1-2-1-1-1',
                                                      level: '寅',
                                                      number: '寅一',
                                                      title: '于诸有情令心平等',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-3-2-2-1-2-1-1-2',
                                                      level: '寅',
                                                      number: '寅二',
                                                      title: '修此一切成悦意相',
                                                      children: []
                                                    }
                                                  ]
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-3-2-2-1-2-1-2',
                                                  level: '丑',
                                                  number: '丑二',
                                                  title: '正发此心',
                                                  children: [
                                                    {
                                                      id: 'part2-4-2-2-2-3-2-2-1-2-1-2-1',
                                                      level: '寅',
                                                      number: '寅一',
                                                      title: '修慈',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-3-2-2-1-2-1-2-2',
                                                      level: '寅',
                                                      number: '寅二',
                                                      title: '修悲',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-3-2-2-1-2-1-2-3',
                                                      level: '寅',
                                                      number: '寅三',
                                                      title: '修增上意乐',
                                                      children: []
                                                    }
                                                  ]
                                                }
                                              ]
                                            },
                                            {
                                              id: 'part2-4-2-2-2-3-2-2-1-2-2',
                                              level: '子',
                                              number: '子二',
                                              title: '修习希求菩提之心',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-3-2-2-1-2-3',
                                              level: '子',
                                              number: '子三',
                                              title: '明所修果即为发心',
                                              children: []
                                            }
                                          ]
                                        }
                                      ]
                                    },
                                    // 壬二：自他相换教授
                                    {
                                      id: 'part2-4-2-2-2-3-2-2-2',
                                      level: '壬',
                                      number: '壬二',
                                      title: '依寂天佛子著述而修',
                                      children: [
                                        {
                                          id: 'part2-4-2-2-2-3-2-2-2-1',
                                          level: '癸',
                                          number: '癸一',
                                          title: '思惟自他能换胜利及不换过患',
                                          children: []
                                        },
                                        {
                                          id: 'part2-4-2-2-2-3-2-2-2-2',
                                          level: '癸',
                                          number: '癸二',
                                          title: '若能修习彼心定能发生',
                                          children: []
                                        },
                                        {
                                          id: 'part2-4-2-2-2-3-2-2-2-3',
                                          level: '癸',
                                          number: '癸三',
                                          title: '修习自他相换法之次第',
                                          children: [
                                            {
                                              id: 'part2-4-2-2-2-3-2-2-2-3-1',
                                              level: '子',
                                              number: '子一',
                                              title: '除其障碍',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-3-2-2-2-3-2',
                                              level: '子',
                                              number: '子二',
                                              title: '正明修法',
                                              children: []
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                },
                                // 辛三：发起之量
                                {
                                  id: 'part2-4-2-2-2-3-2-3',
                                  level: '辛',
                                  number: '辛三',
                                  title: '发起之量',
                                  children: []
                                },
                                // 辛四：仪轨受法（受菩萨戒）
                                {
                                  id: 'part2-4-2-2-2-3-2-4',
                                  level: '辛',
                                  number: '辛四',
                                  title: '仪轨受法',
                                  children: [
                                    {
                                      id: 'part2-4-2-2-2-3-2-4-1',
                                      level: '壬',
                                      number: '壬一',
                                      title: '未得令得',
                                      children: [
                                        {
                                          id: 'part2-4-2-2-2-3-2-4-1-1',
                                          level: '癸',
                                          number: '癸一',
                                          title: '所受之境',
                                          children: []
                                        },
                                        {
                                          id: 'part2-4-2-2-2-3-2-4-1-2',
                                          level: '癸',
                                          number: '癸二',
                                          title: '能受之依',
                                          children: []
                                        },
                                        {
                                          id: 'part2-4-2-2-2-3-2-4-1-3',
                                          level: '癸',
                                          number: '癸三',
                                          title: '如何受之轨则',
                                          children: [
                                            {
                                              id: 'part2-4-2-2-2-3-2-4-1-3-1',
                                              level: '子',
                                              number: '子一',
                                              title: '加行仪轨',
                                              children: [
                                                {
                                                  id: 'part2-4-2-2-2-3-2-4-1-3-1-1',
                                                  level: '丑',
                                                  number: '丑一',
                                                  title: '受胜归依',
                                                  children: [
                                                    {
                                                      id: 'part2-4-2-2-2-3-2-4-1-3-1-1-1',
                                                      level: '寅',
                                                      number: '寅一',
                                                      title: '庄严处所安布塔像陈设供物',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-3-2-4-1-3-1-1-2',
                                                      level: '寅',
                                                      number: '寅二',
                                                      title: '劝请归依',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-3-2-4-1-3-1-1-3',
                                                      level: '寅',
                                                      number: '寅三',
                                                      title: '说归依学处',
                                                      children: []
                                                    }
                                                  ]
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-3-2-4-1-3-1-2',
                                                  level: '丑',
                                                  number: '丑二',
                                                  title: '积集资粮',
                                                  children: []
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-3-2-4-1-3-1-3',
                                                  level: '丑',
                                                  number: '丑三',
                                                  title: '净修意乐',
                                                  children: []
                                                }
                                              ]
                                            },
                                            {
                                              id: 'part2-4-2-2-2-3-2-4-1-3-2',
                                              level: '子',
                                              number: '子二',
                                              title: '正修仪轨',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-3-2-4-1-3-3',
                                              level: '子',
                                              number: '子三',
                                              title: '完结仪轨',
                                              children: []
                                            }
                                          ]
                                        }
                                      ]
                                    },
                                    {
                                      id: 'part2-4-2-2-2-3-2-4-2',
                                      level: '壬',
                                      number: '壬二',
                                      title: '已得守护不坏',
                                      children: [
                                        {
                                          id: 'part2-4-2-2-2-3-2-4-2-1',
                                          level: '癸',
                                          number: '癸一',
                                          title: '修学现法不退发心之因',
                                          children: [
                                            {
                                              id: 'part2-4-2-2-2-3-2-4-2-1-1',
                                              level: '子',
                                              number: '子一',
                                              title: '为于发心增欢喜故应当修学忆念胜利',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-3-2-4-2-1-2',
                                              level: '子',
                                              number: '子二',
                                              title: '正令增长所发心故应当修学六次发心',
                                              children: [
                                                {
                                                  id: 'part2-4-2-2-2-3-2-4-2-1-2-1',
                                                  level: '丑',
                                                  number: '丑一',
                                                  title: '不舍所发心愿',
                                                  children: []
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-3-2-4-2-1-2-2',
                                                  level: '丑',
                                                  number: '丑二',
                                                  title: '学令增长',
                                                  children: []
                                                }
                                              ]
                                            },
                                            {
                                              id: 'part2-4-2-2-2-3-2-4-2-1-3',
                                              level: '子',
                                              number: '子三',
                                              title: '为利有情而发其心应学其心不舍有情',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-3-2-4-2-1-4',
                                              level: '子',
                                              number: '子四',
                                              title: '修学积集福智资粮',
                                              children: []
                                            }
                                          ]
                                        },
                                        {
                                          id: 'part2-4-2-2-2-3-2-4-2-2',
                                          level: '癸',
                                          number: '癸二',
                                          title: '修学余生不离发心之因',
                                          children: [
                                            {
                                              id: 'part2-4-2-2-2-3-2-4-2-2-1',
                                              level: '子',
                                              number: '子一',
                                              title: '断除能失四种黑法',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-3-2-4-2-2-2',
                                              level: '子',
                                              number: '子二',
                                              title: '受行不失四种白法',
                                              children: []
                                            }
                                          ]
                                        }
                                      ]
                                    },
                                    {
                                      id: 'part2-4-2-2-2-3-2-4-3',
                                      level: '壬',
                                      number: '壬三',
                                      title: '设坏还出之方便',
                                      children: []
                                    }
                                  ]
                                }
                              ]
                            },
                            // 庚三：既发心已学行道理（菩萨行）
                            {
                              id: 'part2-4-2-2-2-3-3',
                              level: '庚',
                              number: '庚三',
                              title: '既发心已学行道理',
                              children: [
                                {
                                  id: 'part2-4-2-2-2-3-3-1',
                                  level: '辛',
                                  number: '辛一',
                                  title: '发心已后须学学处之因相',
                                  children: []
                                },
                                {
                                  id: 'part2-4-2-2-2-3-3-2',
                                  level: '辛',
                                  number: '辛二',
                                  title: '显示学习智能方便一分不能成佛',
                                  children: []
                                },
                                {
                                  id: 'part2-4-2-2-2-3-3-3',
                                  level: '辛',
                                  number: '辛三',
                                  title: '正释学习学处之次第',
                                  children: [
                                    // 壬一：于总大乘学习道理
                                    {
                                      id: 'part2-4-2-2-2-3-3-3-1',
                                      level: '壬',
                                      number: '壬一',
                                      title: '于总大乘学习道理',
                                      children: [
                                        {
                                          id: 'part2-4-2-2-2-3-3-3-1-1',
                                          level: '癸',
                                          number: '癸一',
                                          title: '净修欲学菩萨学处',
                                          children: []
                                        },
                                        {
                                          id: 'part2-4-2-2-2-3-3-3-1-2',
                                          level: '癸',
                                          number: '癸二',
                                          title: '修已受取佛子律仪',
                                          children: []
                                        },
                                        {
                                          id: 'part2-4-2-2-2-3-3-3-1-3',
                                          level: '癸',
                                          number: '癸三',
                                          title: '受已如何学习道理',
                                          children: [
                                            {
                                              id: 'part2-4-2-2-2-3-3-3-1-3-1',
                                              level: '子',
                                              number: '子一',
                                              title: '何所学处',
                                              children: []
                                            },
                                            {
                                              id: 'part2-4-2-2-2-3-3-3-1-3-2',
                                              level: '子',
                                              number: '子二',
                                              title: '其中能摄诸学道理',
                                              children: [
                                                {
                                                  id: 'part2-4-2-2-2-3-3-3-1-3-2-1',
                                                  level: '丑',
                                                  number: '丑一',
                                                  title: '正义数量决定',
                                                  children: []
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-3-3-3-1-3-2-2',
                                                  level: '丑',
                                                  number: '丑二',
                                                  title: '兼说次第决定',
                                                  children: []
                                                }
                                              ]
                                            },
                                            {
                                              id: 'part2-4-2-2-2-3-3-3-1-3-3',
                                              level: '子',
                                              number: '子三',
                                              title: '于此如何学习次第',
                                              children: [
                                                // 丑一：初于总行学习道理（六度）
                                                {
                                                  id: 'part2-4-2-2-2-3-3-3-1-3-3-1',
                                                  level: '丑',
                                                  number: '丑一',
                                                  title: '初于总行学习道理——学习六度熟自佛法',
                                                  children: [
                                                    // 寅一：布施
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1',
                                                      level: '寅',
                                                      number: '寅一',
                                                      title: '学习布施',
                                                      children: [
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-1',
                                                          level: '卯',
                                                          number: '卯一',
                                                          title: '布施度性',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-2',
                                                          level: '卯',
                                                          number: '卯二',
                                                          title: '转趣发起布施方便',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3',
                                                          level: '卯',
                                                          number: '卯三',
                                                          title: '布施差别',
                                                          children: [
                                                            {
                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-1',
                                                              level: '辰',
                                                              number: '辰一',
                                                              title: '总一切依当如何行',
                                                              children: []
                                                            },
                                                            {
                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-2',
                                                              level: '辰',
                                                              number: '辰二',
                                                              title: '观待别依所有差别',
                                                              children: []
                                                            },
                                                            {
                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-3',
                                                              level: '辰',
                                                              number: '辰三',
                                                              title: '布施自性所有差别',
                                                              children: [
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-3-1',
                                                                  level: '巳',
                                                                  number: '巳一',
                                                                  title: '法施',
                                                                  children: []
                                                                },
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-3-2',
                                                                  level: '巳',
                                                                  number: '巳二',
                                                                  title: '无畏施',
                                                                  children: []
                                                                },
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-3-3',
                                                                  level: '巳',
                                                                  number: '巳三',
                                                                  title: '财施',
                                                                  children: [
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-3-3-1',
                                                                      level: '午',
                                                                      number: '午一',
                                                                      title: '实舍财施',
                                                                      children: [
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-3-3-1-1',
                                                                          level: '未',
                                                                          number: '未一',
                                                                          title: '舍财道理',
                                                                          children: [
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-3-3-1-1-1',
                                                                              level: '申',
                                                                              number: '申一',
                                                                              title: '惠施何田',
                                                                              children: []
                                                                            },
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-3-3-1-1-2',
                                                                              level: '申',
                                                                              number: '申二',
                                                                              title: '何心惠施',
                                                                              children: []
                                                                            },
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-3-3-1-1-3',
                                                                              level: '申',
                                                                              number: '申三',
                                                                              title: '如何行施',
                                                                              children: []
                                                                            },
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-3-3-1-1-4',
                                                                              level: '申',
                                                                              number: '申四',
                                                                              title: '施何等物',
                                                                              children: [
                                                                                {
                                                                                  id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-3-3-1-1-4-1',
                                                                                  level: '酉',
                                                                                  number: '酉一',
                                                                                  title: '略示应舍不应舍物',
                                                                                  children: []
                                                                                },
                                                                                {
                                                                                  id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-3-3-1-1-4-2',
                                                                                  level: '酉',
                                                                                  number: '酉二',
                                                                                  title: '广释',
                                                                                  children: [
                                                                                    {
                                                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-3-3-1-1-4-2-1',
                                                                                      level: '戌',
                                                                                      number: '戌一',
                                                                                      title: '广释内物可舍不舍',
                                                                                      children: []
                                                                                    },
                                                                                    {
                                                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-3-3-1-1-4-2-2',
                                                                                      level: '戌',
                                                                                      number: '戌二',
                                                                                      title: '广释外物可舍不舍',
                                                                                      children: [
                                                                                        {
                                                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-3-3-1-1-4-2-2-1',
                                                                                          level: '亥',
                                                                                          number: '亥一',
                                                                                          title: '不舍外物道理',
                                                                                          children: []
                                                                                        },
                                                                                        {
                                                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-3-3-1-1-4-2-2-2',
                                                                                          level: '亥',
                                                                                          number: '亥二',
                                                                                          title: '惠施外物道理',
                                                                                          children: []
                                                                                        }
                                                                                      ]
                                                                                    }
                                                                                  ]
                                                                                }
                                                                              ]
                                                                            }
                                                                          ]
                                                                        },
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-3-3-1-2',
                                                                          level: '未',
                                                                          number: '未二',
                                                                          title: '若不能舍当如何行',
                                                                          children: []
                                                                        },
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-3-3-1-3',
                                                                          level: '未',
                                                                          number: '未三',
                                                                          title: '习近对治布施障碍',
                                                                          children: []
                                                                        }
                                                                      ]
                                                                    },
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-3-3-3-2',
                                                                      level: '午',
                                                                      number: '午二',
                                                                      title: '惟意乐施',
                                                                      children: []
                                                                    }
                                                                  ]
                                                                }
                                                              ]
                                                            }
                                                          ]
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-1-4',
                                                          level: '卯',
                                                          number: '卯四',
                                                          title: '此等略义',
                                                          children: []
                                                        }
                                                      ]
                                                    },
                                                    // 寅二：持戒
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-1-2',
                                                      level: '寅',
                                                      number: '寅二',
                                                      title: '学习持戒',
                                                      children: [
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-2-1',
                                                          level: '卯',
                                                          number: '卯一',
                                                          title: '尸罗自性',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-2-2',
                                                          level: '卯',
                                                          number: '卯二',
                                                          title: '趣入修习尸罗方便',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-2-3',
                                                          level: '卯',
                                                          number: '卯三',
                                                          title: '尸罗差别',
                                                          children: [
                                                            {
                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-2-3-1',
                                                              level: '辰',
                                                              number: '辰一',
                                                              title: '律仪戒',
                                                              children: []
                                                            },
                                                            {
                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-2-3-2',
                                                              level: '辰',
                                                              number: '辰二',
                                                              title: '摄善法戒',
                                                              children: []
                                                            },
                                                            {
                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-2-3-3',
                                                              level: '辰',
                                                              number: '辰三',
                                                              title: '饶益有情戒',
                                                              children: []
                                                            }
                                                          ]
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-2-4',
                                                          level: '卯',
                                                          number: '卯四',
                                                          title: '修尸罗时应如何行',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-2-5',
                                                          level: '卯',
                                                          number: '卯五',
                                                          title: '此等摄义',
                                                          children: []
                                                        }
                                                      ]
                                                    },
                                                    // 寅三：忍辱
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3',
                                                      level: '寅',
                                                      number: '寅三',
                                                      title: '学习忍辱',
                                                      children: [
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-1',
                                                          level: '卯',
                                                          number: '卯一',
                                                          title: '忍之自性',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-2',
                                                          level: '卯',
                                                          number: '卯二',
                                                          title: '趣入修忍之方便',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3',
                                                          level: '卯',
                                                          number: '卯三',
                                                          title: '忍之差别',
                                                          children: [
                                                            {
                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-1',
                                                              level: '辰',
                                                              number: '辰一',
                                                              title: '耐怨害忍',
                                                              children: [
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-1-1',
                                                                  level: '巳',
                                                                  number: '巳一',
                                                                  title: '破除不忍怨所作害',
                                                                  children: [
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-1-1-1',
                                                                      level: '午',
                                                                      number: '午一',
                                                                      title: '破除不忍障乐苦',
                                                                      children: [
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-1-1-1-1',
                                                                          level: '未',
                                                                          number: '未一',
                                                                          title: '显示理不应嗔',
                                                                          children: [
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-1-1-1-1-1',
                                                                              level: '申',
                                                                              number: '申一',
                                                                              title: '观察境',
                                                                              children: []
                                                                            },
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-1-1-1-1-2',
                                                                              level: '申',
                                                                              number: '申二',
                                                                              title: '有境',
                                                                              children: []
                                                                            },
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-1-1-1-1-3',
                                                                              level: '申',
                                                                              number: '申三',
                                                                              title: '所依嗔非应理',
                                                                              children: []
                                                                            }
                                                                          ]
                                                                        },
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-1-1-1-2',
                                                                          level: '未',
                                                                          number: '未二',
                                                                          title: '显示理应悲愍',
                                                                          children: []
                                                                        }
                                                                      ]
                                                                    },
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-1-1-2',
                                                                      level: '午',
                                                                      number: '午二',
                                                                      title: '破除不忍障利等三利毁等三',
                                                                      children: [
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-1-1-2-1',
                                                                          level: '未',
                                                                          number: '未一',
                                                                          title: '破除不忍障誉等三',
                                                                          children: [
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-1-1-2-1-1',
                                                                              level: '申',
                                                                              number: '申一',
                                                                              title: '思惟誉等无功德之理',
                                                                              children: []
                                                                            },
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-1-1-2-1-2',
                                                                              level: '申',
                                                                              number: '申二',
                                                                              title: '思惟有过失之理',
                                                                              children: []
                                                                            },
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-1-1-2-1-3',
                                                                              level: '申',
                                                                              number: '申三',
                                                                              title: '故于此破应当欢喜',
                                                                              children: []
                                                                            }
                                                                          ]
                                                                        },
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-1-1-2-2',
                                                                          level: '未',
                                                                          number: '未二',
                                                                          title: '破除不忍作毁等三',
                                                                          children: []
                                                                        }
                                                                      ]
                                                                    }
                                                                  ]
                                                                },
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-1-2',
                                                                  level: '巳',
                                                                  number: '巳二',
                                                                  title: '破除不喜怨家富盛喜其衰败',
                                                                  children: []
                                                                }
                                                              ]
                                                            },
                                                            {
                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-2',
                                                              level: '辰',
                                                              number: '辰二',
                                                              title: '安受苦忍',
                                                              children: [
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-2-1',
                                                                  level: '巳',
                                                                  number: '巳一',
                                                                  title: '必须安受苦之理',
                                                                  children: []
                                                                },
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-2-2',
                                                                  level: '巳',
                                                                  number: '巳二',
                                                                  title: '引发此之方便',
                                                                  children: [
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-2-2-1',
                                                                      level: '午',
                                                                      number: '午一',
                                                                      title: '有苦生时破除专一执为不喜',
                                                                      children: []
                                                                    },
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-2-2-2',
                                                                      level: '午',
                                                                      number: '午二',
                                                                      title: '显示其苦理应忍受',
                                                                      children: [
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-2-2-2-1',
                                                                          level: '未',
                                                                          number: '未一',
                                                                          title: '思惟苦之功德',
                                                                          children: []
                                                                        },
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-2-2-2-2',
                                                                          level: '未',
                                                                          number: '未二',
                                                                          title: '思惟能忍众苦难行之功德',
                                                                          children: [
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-2-2-2-2-1',
                                                                              level: '申',
                                                                              number: '申一',
                                                                              title: '思解脱等诸大胜利',
                                                                              children: []
                                                                            },
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-2-2-2-2-2',
                                                                              level: '申',
                                                                              number: '申二',
                                                                              title: '思能遮止无量大苦所有胜利',
                                                                              children: []
                                                                            }
                                                                          ]
                                                                        },
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-2-2-2-3',
                                                                          level: '未',
                                                                          number: '未三',
                                                                          title: '从微渐修无难之理',
                                                                          children: []
                                                                        }
                                                                      ]
                                                                    }
                                                                  ]
                                                                },
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-2-3',
                                                                  level: '巳',
                                                                  number: '巳三',
                                                                  title: '处门广释',
                                                                  children: []
                                                                }
                                                              ]
                                                            },
                                                            {
                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-3-3',
                                                              level: '辰',
                                                              number: '辰三',
                                                              title: '思择法忍',
                                                              children: []
                                                            }
                                                          ]
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-4',
                                                          level: '卯',
                                                          number: '卯四',
                                                          title: '修忍时如何行',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-3-5',
                                                          level: '卯',
                                                          number: '卯五',
                                                          title: '此等摄义',
                                                          children: []
                                                        }
                                                      ]
                                                    },
                                                    // 寅四：精进
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4',
                                                      level: '寅',
                                                      number: '寅四',
                                                      title: '学习精进',
                                                      children: [
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4-1',
                                                          level: '卯',
                                                          number: '卯一',
                                                          title: '精进自性',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4-2',
                                                          level: '卯',
                                                          number: '卯二',
                                                          title: '趣入修习精进方便',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4-3',
                                                          level: '卯',
                                                          number: '卯三',
                                                          title: '精进差别',
                                                          children: [
                                                            {
                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4-3-1',
                                                              level: '辰',
                                                              number: '辰一',
                                                              title: '正明差别',
                                                              children: [
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4-3-1-1',
                                                                  level: '巳',
                                                                  number: '巳一',
                                                                  title: '擐甲精进',
                                                                  children: []
                                                                },
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4-3-1-2',
                                                                  level: '巳',
                                                                  number: '巳二',
                                                                  title: '摄善法精进',
                                                                  children: []
                                                                },
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4-3-1-3',
                                                                  level: '巳',
                                                                  number: '巳三',
                                                                  title: '饶益有情精进',
                                                                  children: []
                                                                }
                                                              ]
                                                            },
                                                            {
                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4-3-2',
                                                              level: '辰',
                                                              number: '辰二',
                                                              title: '发生精进之方便',
                                                              children: [
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4-3-2-1',
                                                                  level: '巳',
                                                                  number: '巳一',
                                                                  title: '舍离障碍精进违缘',
                                                                  children: [
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4-3-2-1-1',
                                                                      level: '午',
                                                                      number: '午一',
                                                                      title: '明所治品',
                                                                      children: []
                                                                    },
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4-3-2-1-2',
                                                                      level: '午',
                                                                      number: '午二',
                                                                      title: '修断彼之方便',
                                                                      children: []
                                                                    }
                                                                  ]
                                                                },
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4-3-2-2',
                                                                  level: '巳',
                                                                  number: '巳二',
                                                                  title: '修积顺缘护助资粮',
                                                                  children: [
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4-3-2-2-1',
                                                                      level: '午',
                                                                      number: '午一',
                                                                      title: '发胜解力',
                                                                      children: []
                                                                    },
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4-3-2-2-2',
                                                                      level: '午',
                                                                      number: '午二',
                                                                      title: '发坚固力',
                                                                      children: []
                                                                    },
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4-3-2-2-3',
                                                                      level: '午',
                                                                      number: '午三',
                                                                      title: '以欢喜力',
                                                                      children: []
                                                                    },
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4-3-2-2-4',
                                                                      level: '午',
                                                                      number: '午四',
                                                                      title: '暂止息力',
                                                                      children: []
                                                                    }
                                                                  ]
                                                                },
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4-3-2-3',
                                                                  level: '巳',
                                                                  number: '巳三',
                                                                  title: '依上二缘发勤精进',
                                                                  children: []
                                                                },
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4-3-2-4',
                                                                  level: '巳',
                                                                  number: '巳四',
                                                                  title: '由此身心堪能之理',
                                                                  children: []
                                                                }
                                                              ]
                                                            }
                                                          ]
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4-4',
                                                          level: '卯',
                                                          number: '卯四',
                                                          title: '正修行时应如何修',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-4-5',
                                                          level: '卯',
                                                          number: '卯五',
                                                          title: '此等摄义',
                                                          children: []
                                                        }
                                                      ]
                                                    },
                                                    // 寅五：静虑（禅定）
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-1-5',
                                                      level: '寅',
                                                      number: '寅五',
                                                      title: '学习静虑',
                                                      children: [
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-5-1',
                                                          level: '卯',
                                                          number: '卯一',
                                                          title: '静虑自性',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-5-2',
                                                          level: '卯',
                                                          number: '卯二',
                                                          title: '修彼方便',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-5-3',
                                                          level: '卯',
                                                          number: '卯三',
                                                          title: '静虑差别',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-5-4',
                                                          level: '卯',
                                                          number: '卯四',
                                                          title: '正修彼时应如何行',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-5-5',
                                                          level: '卯',
                                                          number: '卯五',
                                                          title: '此等摄义',
                                                          children: []
                                                        }
                                                      ]
                                                    },
                                                    // 寅六：般若
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-1-6',
                                                      level: '寅',
                                                      number: '寅六',
                                                      title: '学习般若',
                                                      children: [
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-6-1',
                                                          level: '卯',
                                                          number: '卯一',
                                                          title: '慧之自性',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-6-2',
                                                          level: '卯',
                                                          number: '卯二',
                                                          title: '生慧方便',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-6-3',
                                                          level: '卯',
                                                          number: '卯三',
                                                          title: '慧之差别',
                                                          children: [
                                                            {
                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-6-3-1',
                                                              level: '辰',
                                                              number: '辰一',
                                                              title: '通达胜义慧',
                                                              children: []
                                                            },
                                                            {
                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-6-3-2',
                                                              level: '辰',
                                                              number: '辰二',
                                                              title: '通达世俗慧',
                                                              children: []
                                                            },
                                                            {
                                                              id: 'part2-4-2-2-2-3-3-3-1-3-3-1-6-3-3',
                                                              level: '辰',
                                                              number: '辰三',
                                                              title: '通达饶益有情慧',
                                                              children: []
                                                            }
                                                          ]
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-6-4',
                                                          level: '卯',
                                                          number: '卯四',
                                                          title: '正修慧时应如何行',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-1-3-3-1-6-5',
                                                          level: '卯',
                                                          number: '卯五',
                                                          title: '此等摄义',
                                                          children: []
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                },
                                                // 丑二：学习四摄熟他有情
                                                {
                                                  id: 'part2-4-2-2-2-3-3-3-1-3-3-2',
                                                  level: '丑',
                                                  number: '丑二',
                                                  title: '学习四摄熟他有情',
                                                  children: [
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-2-1',
                                                      level: '寅',
                                                      number: '寅一',
                                                      title: '四摄自性',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-2-2',
                                                      level: '寅',
                                                      number: '寅二',
                                                      title: '立四之理由',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-2-3',
                                                      level: '寅',
                                                      number: '寅三',
                                                      title: '四摄之作业',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-2-4',
                                                      level: '寅',
                                                      number: '寅四',
                                                      title: '摄受眷属须依四摄',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-1-3-3-2-5',
                                                      level: '寅',
                                                      number: '寅五',
                                                      title: '略为解说',
                                                      children: []
                                                    }
                                                  ]
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    },
                                    // 壬二：特于后二波罗蜜多学习道理（止观）
                                    {
                                      id: 'part2-4-2-2-2-3-3-3-2',
                                      level: '壬',
                                      number: '壬二',
                                      title: '特于后二波罗蜜多学习道理',
                                      children: [
                                        {
                                          id: 'part2-4-2-2-2-3-3-3-2-1',
                                          level: '癸',
                                          number: '癸一',
                                          title: '修习止观之胜利',
                                          children: []
                                        },
                                        {
                                          id: 'part2-4-2-2-2-3-3-3-2-2',
                                          level: '癸',
                                          number: '癸二',
                                          title: '显示此二摄一切定',
                                          children: []
                                        },
                                        {
                                          id: 'part2-4-2-2-2-3-3-3-2-3',
                                          level: '癸',
                                          number: '癸三',
                                          title: '止观自性',
                                          children: []
                                        },
                                        {
                                          id: 'part2-4-2-2-2-3-3-3-2-4',
                                          level: '癸',
                                          number: '癸四',
                                          title: '理须双修',
                                          children: []
                                        },
                                        {
                                          id: 'part2-4-2-2-2-3-3-3-2-5',
                                          level: '癸',
                                          number: '癸五',
                                          title: '次第决定',
                                          children: []
                                        },
                                        {
                                          id: 'part2-4-2-2-2-3-3-3-2-6',
                                          level: '癸',
                                          number: '癸六',
                                          title: '各别学法',
                                          children: [
                                            // 子一：学奢摩他法
                                            {
                                              id: 'part2-4-2-2-2-3-3-3-2-6-1',
                                              level: '子',
                                              number: '子一',
                                              title: '学奢摩他法',
                                              children: [
                                                {
                                                  id: 'part2-4-2-2-2-3-3-3-2-6-1-1',
                                                  level: '丑',
                                                  number: '丑一',
                                                  title: '修止资粮',
                                                  children: []
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-3-3-3-2-6-1-2',
                                                  level: '丑',
                                                  number: '丑二',
                                                  title: '依止资粮修奢摩他',
                                                  children: [
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-2-6-1-2-1',
                                                      level: '寅',
                                                      number: '寅一',
                                                      title: '加行',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2',
                                                      level: '寅',
                                                      number: '寅二',
                                                      title: '正行',
                                                      children: [
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-1',
                                                          level: '卯',
                                                          number: '卯一',
                                                          title: '身何威仪而修',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2',
                                                          level: '卯',
                                                          number: '卯二',
                                                          title: '正释修习之次第',
                                                          children: [
                                                            {
                                                              id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1',
                                                              level: '辰',
                                                              number: '辰一',
                                                              title: '引生无过三摩地法',
                                                              children: [
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-1',
                                                                  level: '巳',
                                                                  number: '巳一',
                                                                  title: '系心所缘先如何修',
                                                                  children: []
                                                                },
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-2',
                                                                  level: '巳',
                                                                  number: '巳二',
                                                                  title: '住所缘时应如何修',
                                                                  children: [
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-2-1',
                                                                      level: '午',
                                                                      number: '午一',
                                                                      title: '明心住之所缘',
                                                                      children: [
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-2-1-1',
                                                                          level: '未',
                                                                          number: '未一',
                                                                          title: '总建立所缘',
                                                                          children: [
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-2-1-1-1',
                                                                              level: '申',
                                                                              number: '申一',
                                                                              title: '正明所缘',
                                                                              children: []
                                                                            },
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-2-1-1-2',
                                                                              level: '申',
                                                                              number: '申二',
                                                                              title: '显示何等补特伽罗应缘何境',
                                                                              children: []
                                                                            },
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-2-1-1-3',
                                                                              level: '申',
                                                                              number: '申三',
                                                                              title: '显示所缘异门',
                                                                              children: []
                                                                            }
                                                                          ]
                                                                        },
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-2-1-2',
                                                                          level: '未',
                                                                          number: '未二',
                                                                          title: '明此处之所缘',
                                                                          children: []
                                                                        }
                                                                      ]
                                                                    },
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-2-2',
                                                                      level: '午',
                                                                      number: '午二',
                                                                      title: '心于所缘如何安住',
                                                                      children: [
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-2-2-1',
                                                                          level: '未',
                                                                          number: '未一',
                                                                          title: '立无过规',
                                                                          children: []
                                                                        },
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-2-2-2',
                                                                          level: '未',
                                                                          number: '未二',
                                                                          title: '破有过规',
                                                                          children: []
                                                                        },
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-2-2-3',
                                                                          level: '未',
                                                                          number: '未三',
                                                                          title: '示修时量',
                                                                          children: []
                                                                        }
                                                                      ]
                                                                    }
                                                                  ]
                                                                },
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-3',
                                                                  level: '巳',
                                                                  number: '巳三',
                                                                  title: '住所缘后应如何修',
                                                                  children: [
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-3-1',
                                                                      level: '午',
                                                                      number: '午一',
                                                                      title: '有沉掉时应如何修',
                                                                      children: [
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-3-1-1',
                                                                          level: '未',
                                                                          number: '未一',
                                                                          title: '修习对治不知沉掉',
                                                                          children: [
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-3-1-1-1',
                                                                              level: '申',
                                                                              number: '申一',
                                                                              title: '抉择沉掉之相',
                                                                              children: []
                                                                            },
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-3-1-1-2',
                                                                              level: '申',
                                                                              number: '申二',
                                                                              title: '于正修时生觉沉掉正知方便',
                                                                              children: []
                                                                            }
                                                                          ]
                                                                        },
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-3-1-2',
                                                                          level: '未',
                                                                          number: '未二',
                                                                          title: '修习知已为断彼故对治不勤功用',
                                                                          children: [
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-3-1-2-1',
                                                                              level: '申',
                                                                              number: '申一',
                                                                              title: '正明其思灭沉掉法',
                                                                              children: []
                                                                            },
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-3-1-2-2',
                                                                              level: '申',
                                                                              number: '申二',
                                                                              title: '明能生沉掉之因',
                                                                              children: []
                                                                            }
                                                                          ]
                                                                        }
                                                                      ]
                                                                    },
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-1-3-2',
                                                                      level: '午',
                                                                      number: '午二',
                                                                      title: '离沉掉时应如何修',
                                                                      children: []
                                                                    }
                                                                  ]
                                                                }
                                                              ]
                                                            },
                                                            {
                                                              id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-2',
                                                              level: '辰',
                                                              number: '辰二',
                                                              title: '依彼引生住心次第',
                                                              children: [
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-2-1',
                                                                  level: '巳',
                                                                  number: '巳一',
                                                                  title: '正明引生住心次第',
                                                                  children: []
                                                                },
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-2-2',
                                                                  level: '巳',
                                                                  number: '巳二',
                                                                  title: '由六力成办',
                                                                  children: []
                                                                },
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-1-2-2-2-2-3',
                                                                  level: '巳',
                                                                  number: '巳三',
                                                                  title: '具四种作意',
                                                                  children: []
                                                                }
                                                              ]
                                                            }
                                                          ]
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-3-3-3-2-6-1-3',
                                                  level: '丑',
                                                  number: '丑三',
                                                  title: '修已成就奢摩他量',
                                                  children: [
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-2-6-1-3-1',
                                                      level: '寅',
                                                      number: '寅一',
                                                      title: '显示奢摩他成与未成之界限',
                                                      children: [
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-2-6-1-3-1-1',
                                                          level: '卯',
                                                          number: '卯一',
                                                          title: '显示正义',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-2-6-1-3-1-2',
                                                          level: '卯',
                                                          number: '卯二',
                                                          title: '有作意相及断疑',
                                                          children: []
                                                        }
                                                      ]
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-2-6-1-3-2',
                                                      level: '寅',
                                                      number: '寅二',
                                                      title: '显示依奢摩他趣总道轨',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-2-6-1-3-3',
                                                      level: '寅',
                                                      number: '寅三',
                                                      title: '显示别趣世间道轨',
                                                      children: [
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-2-6-1-3-3-1',
                                                          level: '卯',
                                                          number: '卯一',
                                                          title: '显往粗静相道须得正奢摩他',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-2-6-1-3-3-2',
                                                          level: '卯',
                                                          number: '卯二',
                                                          title: '依奢摩他离欲之理',
                                                          children: []
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                }
                                              ]
                                            },
                                            // 子二：学毗钵舍那法
                                            {
                                              id: 'part2-4-2-2-2-3-3-3-2-6-2',
                                              level: '子',
                                              number: '子二',
                                              title: '学毗钵舍那法',
                                              children: [
                                                {
                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1',
                                                  level: '丑',
                                                  number: '丑一',
                                                  title: '依止毗钵舍那资粮',
                                                  children: [
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-2-6-2-1-1',
                                                      level: '寅',
                                                      number: '寅一',
                                                      title: '明了义不了义经',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-2-6-2-1-2',
                                                      level: '寅',
                                                      number: '寅二',
                                                      title: '如何解释龙猛意趣',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3',
                                                      level: '寅',
                                                      number: '寅三',
                                                      title: '抉择空性正见之次第',
                                                      children: [
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-1',
                                                          level: '卯',
                                                          number: '卯一',
                                                          title: '悟入真实义之次第',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2',
                                                          level: '卯',
                                                          number: '卯二',
                                                          title: '正抉择真实义',
                                                          children: [
                                                            {
                                                              id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-1',
                                                              level: '辰',
                                                              number: '辰一',
                                                              title: '正明正理所破',
                                                              children: [
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-1-1',
                                                                  level: '巳',
                                                                  number: '巳一',
                                                                  title: '必须善明所破之因相',
                                                                  children: []
                                                                },
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-1-2',
                                                                  level: '巳',
                                                                  number: '巳二',
                                                                  title: '遮遣余派未明所破而妄破除',
                                                                  children: [
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-1-2-1',
                                                                      level: '午',
                                                                      number: '午一',
                                                                      title: '明所破义遮破太过',
                                                                      children: [
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-1-2-1-1',
                                                                          level: '未',
                                                                          number: '未一',
                                                                          title: '说其所欲',
                                                                          children: []
                                                                        },
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-1-2-1-2',
                                                                          level: '未',
                                                                          number: '未二',
                                                                          title: '显其非理',
                                                                          children: [
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-1-2-1-2-1',
                                                                              level: '申',
                                                                              number: '申一',
                                                                              title: '显彼破坏中观不共胜法',
                                                                              children: [
                                                                                {
                                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-1-2-1-2-1-1',
                                                                                  level: '酉',
                                                                                  number: '酉一',
                                                                                  title: '明中观胜法',
                                                                                  children: []
                                                                                },
                                                                                {
                                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-1-2-1-2-1-2',
                                                                                  level: '酉',
                                                                                  number: '酉二',
                                                                                  title: '彼如何破坏',
                                                                                  children: []
                                                                                },
                                                                                {
                                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-1-2-1-2-1-3',
                                                                                  level: '酉',
                                                                                  number: '酉三',
                                                                                  title: '诸中观师如何答彼',
                                                                                  children: []
                                                                                }
                                                                              ]
                                                                            },
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-1-2-1-2-2',
                                                                              level: '申',
                                                                              number: '申二',
                                                                              title: '显所设难皆非能破',
                                                                              children: [
                                                                                {
                                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-1-2-1-2-2-1',
                                                                                  level: '酉',
                                                                                  number: '酉一',
                                                                                  title: '观察堪不堪忍正理思择而为破除然不能破',
                                                                                  children: []
                                                                                },
                                                                                {
                                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-1-2-1-2-2-2',
                                                                                  level: '酉',
                                                                                  number: '酉二',
                                                                                  title: '观察由量成不成立而为破除然不能破',
                                                                                  children: []
                                                                                },
                                                                                {
                                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-1-2-1-2-2-3',
                                                                                  level: '酉',
                                                                                  number: '酉三',
                                                                                  title: '观察是否四句所生而为破除然不能破',
                                                                                  children: []
                                                                                },
                                                                                {
                                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-1-2-1-2-2-4',
                                                                                  level: '酉',
                                                                                  number: '酉四',
                                                                                  title: '观察有事无事等四句而为破除然不能破',
                                                                                  children: []
                                                                                }
                                                                              ]
                                                                            }
                                                                          ]
                                                                        }
                                                                      ]
                                                                    },
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-1-2-2',
                                                                      level: '午',
                                                                      number: '午二',
                                                                      title: '明所破义遮破太狭',
                                                                      children: []
                                                                    }
                                                                  ]
                                                                },
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-1-3',
                                                                  level: '巳',
                                                                  number: '巳三',
                                                                  title: '自派明显所破之理',
                                                                  children: [
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-1-3-1',
                                                                      level: '午',
                                                                      number: '午一',
                                                                      title: '正明所破义',
                                                                      children: []
                                                                    },
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-1-3-2',
                                                                      level: '午',
                                                                      number: '午二',
                                                                      title: '于余所破加不加此之理',
                                                                      children: []
                                                                    },
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-1-3-3',
                                                                      level: '午',
                                                                      number: '午三',
                                                                      title: '释于所破应不应加胜义简别',
                                                                      children: []
                                                                    }
                                                                  ]
                                                                }
                                                              ]
                                                            },
                                                            {
                                                              id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-2',
                                                              level: '辰',
                                                              number: '辰二',
                                                              title: '破所破时应能立以谁而破',
                                                              children: [
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-2-1',
                                                                  level: '巳',
                                                                  number: '巳一',
                                                                  title: '明应成自续之义',
                                                                  children: [
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-2-1-1',
                                                                      level: '午',
                                                                      number: '午一',
                                                                      title: '破除他宗',
                                                                      children: [
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-2-1-1-1',
                                                                          level: '未',
                                                                          number: '未一',
                                                                          title: '出计',
                                                                          children: []
                                                                        },
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-2-1-1-2',
                                                                          level: '未',
                                                                          number: '未二',
                                                                          title: '破执',
                                                                          children: []
                                                                        }
                                                                      ]
                                                                    },
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-2-1-2',
                                                                      level: '午',
                                                                      number: '午二',
                                                                      title: '安立自宗',
                                                                      children: [
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-2-1-2-1',
                                                                          level: '未',
                                                                          number: '未一',
                                                                          title: '正破自续',
                                                                          children: [
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-2-1-2-1-1',
                                                                              level: '申',
                                                                              number: '申一',
                                                                              title: '显示所依有法不极成之宗过',
                                                                              children: [
                                                                                {
                                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-2-1-2-1-1-1',
                                                                                  level: '酉',
                                                                                  number: '酉一',
                                                                                  title: '出计',
                                                                                  children: []
                                                                                },
                                                                                {
                                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-2-1-2-1-1-2',
                                                                                  level: '酉',
                                                                                  number: '酉二',
                                                                                  title: '破执',
                                                                                  children: [
                                                                                    {
                                                                                      id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-2-1-2-1-1-2-1',
                                                                                      level: '戌',
                                                                                      number: '戌一',
                                                                                      title: '义不应理',
                                                                                      children: []
                                                                                    },
                                                                                    {
                                                                                      id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-2-1-2-1-1-2-2',
                                                                                      level: '戌',
                                                                                      number: '戌二',
                                                                                      title: '喻不相同',
                                                                                      children: []
                                                                                    }
                                                                                  ]
                                                                                }
                                                                              ]
                                                                            },
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-2-1-2-1-2',
                                                                              level: '申',
                                                                              number: '申二',
                                                                              title: '由此过故显示因亦不成',
                                                                              children: []
                                                                            }
                                                                          ]
                                                                        },
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-2-1-2-2',
                                                                          level: '未',
                                                                          number: '未二',
                                                                          title: '自不同破之理',
                                                                          children: []
                                                                        }
                                                                      ]
                                                                    }
                                                                  ]
                                                                },
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-2-2',
                                                                  level: '巳',
                                                                  number: '巳二',
                                                                  title: '自生正见当随谁行',
                                                                  children: []
                                                                }
                                                              ]
                                                            },
                                                            {
                                                              id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-3',
                                                              level: '辰',
                                                              number: '辰三',
                                                              title: '依其能破于相续中生见之法',
                                                              children: [
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-3-1',
                                                                  level: '巳',
                                                                  number: '巳一',
                                                                  title: '抉择补特伽罗无我',
                                                                  children: [
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-3-1-1',
                                                                      level: '午',
                                                                      number: '午一',
                                                                      title: '正抉择我无自性',
                                                                      children: [
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-3-1-1-1',
                                                                          level: '未',
                                                                          number: '未一',
                                                                          title: '立喻（车喻）',
                                                                          children: [
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-3-1-1-1-1',
                                                                              level: '申',
                                                                              number: '申一',
                                                                              title: '显车无性而为假有',
                                                                              children: []
                                                                            },
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-3-1-1-1-2',
                                                                              level: '申',
                                                                              number: '申二',
                                                                              title: '于彼断诤',
                                                                              children: []
                                                                            },
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-3-1-1-1-3',
                                                                              level: '申',
                                                                              number: '申三',
                                                                              title: '由名差别皆得成立',
                                                                              children: []
                                                                            },
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-3-1-1-1-4',
                                                                              level: '申',
                                                                              number: '申四',
                                                                              title: '依此速得正见胜利',
                                                                              children: []
                                                                            }
                                                                          ]
                                                                        },
                                                                        {
                                                                          id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-3-1-1-2',
                                                                          level: '未',
                                                                          number: '未二',
                                                                          title: '合义',
                                                                          children: [
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-3-1-1-2-1',
                                                                              level: '申',
                                                                              number: '申一',
                                                                              title: '合无自性义',
                                                                              children: [
                                                                                {
                                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-3-1-1-2-1-1',
                                                                                  level: '酉',
                                                                                  number: '酉一',
                                                                                  title: '破我与蕴性一品',
                                                                                  children: []
                                                                                },
                                                                                {
                                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-3-1-1-2-1-2',
                                                                                  level: '酉',
                                                                                  number: '酉二',
                                                                                  title: '破我与蕴性异品',
                                                                                  children: []
                                                                                },
                                                                                {
                                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-3-1-1-2-1-3',
                                                                                  level: '酉',
                                                                                  number: '酉三',
                                                                                  title: '由此亦能破诸余品',
                                                                                  children: []
                                                                                },
                                                                                {
                                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-3-1-1-2-1-4',
                                                                                  level: '酉',
                                                                                  number: '酉四',
                                                                                  title: '依彼能见补特伽罗犹如幻化',
                                                                                  children: []
                                                                                }
                                                                              ]
                                                                            },
                                                                            {
                                                                              id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-3-1-1-2-2',
                                                                              level: '申',
                                                                              number: '申二',
                                                                              title: '合由名差别成就义',
                                                                              children: []
                                                                            }
                                                                          ]
                                                                        }
                                                                      ]
                                                                    },
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-3-1-2',
                                                                      level: '午',
                                                                      number: '午二',
                                                                      title: '显由此成我所无性',
                                                                      children: []
                                                                    },
                                                                    {
                                                                      id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-3-1-3',
                                                                      level: '午',
                                                                      number: '午三',
                                                                      title: '此诸正理于余例明',
                                                                      children: []
                                                                    }
                                                                  ]
                                                                },
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-3-2',
                                                                  level: '巳',
                                                                  number: '巳二',
                                                                  title: '抉择法无我',
                                                                  children: []
                                                                },
                                                                {
                                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-1-3-2-3-3',
                                                                  level: '巳',
                                                                  number: '巳三',
                                                                  title: '修习此见断障之理',
                                                                  children: []
                                                                }
                                                              ]
                                                            }
                                                          ]
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-2',
                                                  level: '丑',
                                                  number: '丑二',
                                                  title: '毗钵舍那所有差别',
                                                  children: []
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-3',
                                                  level: '丑',
                                                  number: '丑三',
                                                  title: '修习毗钵舍那之法',
                                                  children: [
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-2-6-2-3-1',
                                                      level: '寅',
                                                      number: '寅一',
                                                      title: '破他宗',
                                                      children: []
                                                    },
                                                    {
                                                      id: 'part2-4-2-2-2-3-3-3-2-6-2-3-2',
                                                      level: '寅',
                                                      number: '寅二',
                                                      title: '立自宗',
                                                      children: [
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-2-6-2-3-2-1',
                                                          level: '卯',
                                                          number: '卯一',
                                                          title: '双修止观之理',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-2-6-2-3-2-2',
                                                          level: '卯',
                                                          number: '卯二',
                                                          title: '于彼断诤',
                                                          children: []
                                                        },
                                                        {
                                                          id: 'part2-4-2-2-2-3-3-3-2-6-2-3-2-3',
                                                          level: '卯',
                                                          number: '卯三',
                                                          title: '略摄修要',
                                                          children: []
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                },
                                                {
                                                  id: 'part2-4-2-2-2-3-3-3-2-6-2-4',
                                                  level: '丑',
                                                  number: '丑四',
                                                  title: '由修习故毗钵舍那成就之量',
                                                  children: []
                                                }
                                              ]
                                            },
                                            // 子三：学双运法
                                            {
                                              id: 'part2-4-2-2-2-3-3-3-2-6-3',
                                              level: '子',
                                              number: '子三',
                                              title: '学双运法',
                                              children: []
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
