/*
 * @Description: 导出excel
 * @Author: flyer
 * @Date: 2022-03-23 15:11:23
 * @LastEditTime: 2022-03-30 15:26:27
 * @LastEditors: flyer
 */
const Excel = require('exceljs');

const exportExcel = async luckysheet => {
    // 参数为luckysheet.getluckysheetfile()获取的对象
    // 1.创建工作簿，可以为工作簿添加属性
    const workbook = new Excel.Workbook();
    // 2.创建表格，第二个参数可以配置创建什么样的工作表
    luckysheet.every(table => {
        if (table.data.length === 0) return true;
        console.log('table', table);
        // const worksheet = workbook.addWorksheet(table.name)
        const worksheet = workbook.addWorksheet(table.name, { views: [{ state: 'frozen', xSplit: 1, ySplit: 0 }] });
        setFrozen(table.frozen, worksheet);
        setColunmWidth(table.config.columnlen, worksheet);
        setRowWidth(table.config.rowlen, worksheet);
        // 3.设置单元格合并,设置单元格边框,设置单元格样式,设置值
        setStyleAndValue(table.data, worksheet, table.hyperlink);
        setMerge(table.config.merge, worksheet);
        setBorder(table.config.borderInfo, worksheet);
        setImg(table.images, workbook, worksheet);
        return true;
    });
    // 4.写入 buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

/**
 * @description: 冻结行列
 * @author: flyer
 * @param {Object} frozen 冻结数据
 * @param {Object} worksheet 表格
 */
const setFrozen = (frozen, worksheet) => {
    if (!frozen) return
    if(!worksheet.views) worksheet.views = {}
    switch (frozen.type) {
        case 'row':
            worksheet.views = [{ state: 'frozen', xSplit: 1, ySplit: 0 }];
            break;
        case 'column':
            worksheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 1 }];
            break;
        case 'both':
            worksheet.views = [{ state: 'frozen', xSplit: 1, ySplit: 1 }];
            break;
        case 'rangeRow':
            worksheet.views = [{ state: 'frozen', xSplit: 0, ySplit: frozen.range.row_focus + 1}];
            break;
        case 'rangeColumn':
            worksheet.views = [{ state: 'frozen', xSplit: frozen.range.column_focus + 1, ySplit:0 }];
            break;
        case 'rangeBoth':
            worksheet.views = [{ state: 'frozen', xSplit: frozen.range.column_focus + 1, ySplit: frozen.range.row_focus + 1 }];
            break;
        case 'cancel':
            worksheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 0}];
            break;
        default:
            break;
    }
};

/**
 * @description: 设置插入图片
 * @author: flyer
 * @param {Object} images 图片文件
 * @param {Object} workbook 工作区
 * @param {Object} worksheet excel表格
 */
const setImg = (images, workbook, worksheet) => {
    for (const key in images) {
        const imageId = workbook.addImage({
            base64: images[key].src,
            extension: 'png'
        });
        const heights = worksheet.columns.map(item => item.width);
        let width = 0;
        let i = 0;
        let k = 0;
        while (width < images[key].default.left) {
            k = i + (images[key].default.left - width) / (heights[i] ? heights[i] * 8 || 72 : 72);
            width += heights[i] ? heights[i] * 8 || 72 : 72;
            i++;
        }
        worksheet.addImage(imageId, {
            tl: { col: k, row: images[key].default.top / 20 },
            ext: { width: images[key].default.width, height: images[key].default.height }
        });
    }
};

/**
 * @description: 设置列宽
 * @author: flyer
 * @param {Object} widths 列宽配置
 * @param {Object} worksheet 当前excel
 */
const setColunmWidth = (widths = {}, worksheet) => {
    const keys = Object.keys(widths).map(item => Number(item));
    const maxKey = Math.max(...keys);
    const mergearr = [];
    for (let i = 0; i <= maxKey; i++) {
        mergearr.push({ key: `${i}`, width: (widths[`${i}`] || 0) / 7.5 });
    }
    worksheet.columns = mergearr;
};

/**
 * @description: 设置行宽
 * @author: flyer
 * @param {Object} widths 列宽配置
 * @param {Object} worksheet 当前excel
 */
const setRowWidth = (widths = {}, worksheet) => {
    const keys = Object.keys(widths).map(item => Number(item));
    const maxKey = Math.max(...keys);
    for (let i = 0; i <= maxKey; i++) {
        worksheet.getRow(i + 1).height = (widths[`${i}`] || 0) / 1.35;
    }
};

/**
 * @description: 设置合并单元格
 * @author: flyer
 * @param {Object} luckyMerge 合并单元格配置
 * @param {Object} worksheet 当前excel
 */
const setMerge = (luckyMerge = {}, worksheet) => {
    const mergearr = Object.values(luckyMerge);
    mergearr.forEach(elem => {
        // elem格式：{r: 0, c: 0, rs: 1, cs: 2}
        // 按开始行，开始列，结束行，结束列合并（相当于 K10:M12）
        worksheet.mergeCells(elem.r + 1, elem.c + 1, elem.r + elem.rs, elem.c + elem.cs);
    });
};

/**
 * @description: 设置边框
 * @author: flyer
 * @param {Object} luckyBorderInfo 边框配置
 * @param {Object} worksheet 当前excel
 */
const setBorder = (luckyBorderInfo, worksheet) => {
    if (!Array.isArray(luckyBorderInfo)) return;
    luckyBorderInfo.forEach(elem => {
        // 设置传入的边框
        if (elem.rangeType === 'cell') {
            const border = borderConvertOld(elem.value);
            worksheet.getCell(elem.value.row_index + 1, elem.value.col_index + 1).border = border;
        }
    });
    luckyBorderInfo.forEach(elem => {
        // 设置在线修改的边框
        if (elem.rangeType === 'range') {
            borderConvert(elem, worksheet);
        }
    });
};

/**
 * @description: 设置单元格值和样式
 * @author: flyer
 * @param {Object} cellArr 单元格数据
 * @param {Object} worksheet 当前excel
 * @param {Object} hyperlink 所有链接
 */
const setStyleAndValue = (cellArr, worksheet, hyperlink) => {
    if (!Array.isArray(cellArr)) return;
    cellArr.forEach((row, rowid) => {
        row.every((cell, columnid) => {
            if (!cell) return true;
            const target = worksheet.getCell(rowid + 1, columnid + 1);
            const font = fontConvert(cell.ff, cell.fc, cell.bl, cell.it, cell.fs, cell.cl, cell.un);
            const alignment = alignmentConvert(cell.vt, cell.ht, cell.tb, cell.tr);
            let value;
            if (cell.f) {
                value = { formula: cell.f[0] === '=' ? cell.f.substring(1, cell.f.length) : cell.f, result: cell.v };
            } else {
                if (cell.ct) {
                    if (!cell.ct.s) {
                        value = cell.v;
                        target.numFmt = cell.ct.fa;
                    } else {
                        value = cell.ct.s.map(item => item.v).join('');
                    }
                } else {
                    value = cell.m || cell.v;
                }
            }
            if (cell.bg) {
                const fill = fillConvert(cell.bg);
                target.fill = fill;
            }
            target.font = font;
            target.alignment = alignment;
            if (hyperlink && hyperlink[`${rowid}_${columnid}`]) {
                // 文本是链接的情况,luckysheet未支持
                target.value = { text: value, hyperlink: hyperlink[`${rowid}_${columnid}`].linkAddress, tooltip: hyperlink[`${rowid}_${columnid}`].linkTooltip };
            } else {
                target.value = value;
            }
            return true;
        });
    });
};

/**
 * @description: 设置单元格背景色
 * @author: flyer
 * @param {String} bg 颜色
 */
const fillConvert = bg => {
    const fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: bg.replace('#', '') }
    };
    return fill;
};

/**
 * @description: 设置单元格字体
 * @author: flyer
 * @param {String} bg 颜色
 */
const fontConvert = (ff = 0, fc = '#000000', bl = 0, it = 0, fs = 10, cl = 0, un = 0) => {
    // luckysheet：ff(样式), fc(颜色), bl(粗体), it(斜体), fs(大小), cl(删除线), un(下划线)
    const luckyToExcel = {
        num2bl: num => {
            return num !== 0;
        }
    };

    const font = {
        name: ff,
        family: 1,
        size: fs,
        color: { argb: fc.replace('#', '') },
        bold: luckyToExcel.num2bl(bl),
        italic: luckyToExcel.num2bl(it),
        underline: luckyToExcel.num2bl(un) && 'singleAccounting',
        strike: luckyToExcel.num2bl(cl)
    };

    return font;
};

/**
 * @description: 设置单元格风格
 * @author: flyer
 * @param {String} vt 垂直
 * @param {String} ht 水平
 * @param {String} tb 换行
 * @param {String} tr 旋转
 */
const alignmentConvert = (vt = 'default', ht = 'default', tb = 'default', tr = 'default') => {
    const luckyToExcel = {
        vertical: {
            0: 'middle',
            1: 'top',
            2: 'bottom',
            default: 'top'
        },
        horizontal: {
            0: 'center',
            1: 'left',
            2: 'right',
            default: 'left'
        },
        wrapText: {
            0: false,
            1: false,
            2: true,
            default: false
        },
        textRotation: {
            0: 0,
            1: 45,
            2: -45,
            3: 'vertical',
            4: 90,
            5: -90,
            default: 0
        }
    };

    const alignment = {
        vertical: luckyToExcel.vertical[vt],
        horizontal: luckyToExcel.horizontal[ht],
        wrapText: luckyToExcel.wrapText[tb],
        textRotation: luckyToExcel.textRotation[tr]
    };
    return alignment;
};

/**
 * @description: 设置在线编辑的excel风格样式
 * @author: flyer
 * @param {String} borderType 类型
 * @param {String} style 风格
 * @param {String} color 颜色
 */
const borderConvert = (elem, worksheet) => {
    const { borderType, style = 1, color = '#000' } = elem;
    if (!borderType || !elem.range || !elem.range.length) {
        return;
    }
    const styleArr = {
        0: 'none',
        1: 'thin',
        2: 'hair',
        3: 'dotted',
        4: 'dashDot', // 'Dashed',
        5: 'dashDot',
        6: 'dashDotDot',
        7: 'double',
        8: 'medium',
        9: 'mediumDashed',
        10: 'mediumDashDot',
        11: 'mediumDashDotDot',
        12: 'slantDashDot',
        13: 'thick'
    };
    const rang = elem.range[0];
    const template = { style: styleArr[style], color: { argb: color.replace('#', '') } };
    switch (borderType) {
        case 'border-top':
            for (let i = rang.column[0]; i <= rang.column[1]; i++) {
                if (!worksheet.getCell(rang.row[0] + 1, i + 1).border) {
                    worksheet.getCell(rang.row[0] + 1, i + 1).border = {};
                }
                worksheet.getCell(rang.row[0] + 1, i + 1).border.top = template;
            }
            break;
        case 'border-bottom':
            for (let i = rang.column[0]; i <= rang.column[1]; i++) {
                if (!worksheet.getCell(rang.row[1] + 2, i + 1).border) {
                    worksheet.getCell(rang.row[1] + 2, i + 1).border = {};
                }
                worksheet.getCell(rang.row[1] + 2, i + 1).border.top = template;
            }
            break;
        case 'border-left':
            for (let j = rang.row[0]; j <= rang.row[1]; j++) {
                if (!worksheet.getCell(j + 1, rang.column[0] + 1).border) {
                    worksheet.getCell(j + 1, rang.column[0] + 1).border = {};
                }
                worksheet.getCell(j + 1, rang.column[0] + 1).border.left = template;
            }
            break;
        case 'border-right':
            for (let j = rang.row[0]; j <= rang.row[1]; j++) {
                if (!worksheet.getCell(j + 1, rang.column[1] + 2).border) {
                    worksheet.getCell(j + 1, rang.column[1] + 2).border = {};
                }
                worksheet.getCell(j + 1, rang.column[1] + 2).border.left = template;
            }
            break;
        case 'border-outside':
            for (let i = rang.column[0] + 1; i <= rang.column[1]; i++) {
                if (!worksheet.getCell(rang.row[0] + 1, i + 1).border) {
                    worksheet.getCell(rang.row[0] + 1, i + 1).border = {};
                }
                worksheet.getCell(rang.row[0] + 1, i + 1).border.top = template;
            }
            for (let i = rang.column[0] + 1; i <= rang.column[1]; i++) {
                if (!worksheet.getCell(rang.row[1] + 2, i + 1).border) {
                    worksheet.getCell(rang.row[1] + 2, i + 1).border = {};
                }
                worksheet.getCell(rang.row[1] + 2, i + 1).border.top = template;
            }
            for (let j = rang.row[0] + 1; j <= rang.row[1]; j++) {
                if (!worksheet.getCell(j + 1, rang.column[0] + 1).border) {
                    worksheet.getCell(j + 1, rang.column[0] + 1).border = {};
                }
                worksheet.getCell(j + 1, rang.column[0] + 1).border.left = template;
            }
            for (let j = rang.row[0] + 1; j <= rang.row[1]; j++) {
                if (!worksheet.getCell(j + 1, rang.column[1] + 2).border) {
                    worksheet.getCell(j + 1, rang.column[1] + 2).border = {};
                }
                worksheet.getCell(j + 1, rang.column[1] + 2).border.left = template;
            }
            if (!worksheet.getCell(rang.row[0] + 1, rang.column[0] + 1).border) {
                worksheet.getCell(rang.row[0] + 1, rang.column[0] + 1).border = {};
            }
            if (!worksheet.getCell(rang.row[0] + 1, rang.column[1] + 1).border) {
                worksheet.getCell(rang.row[0] + 1, rang.column[1] + 1).border = {};
            }
            if (!worksheet.getCell(rang.row[1] + 1, rang.column[0] + 1).border) {
                worksheet.getCell(rang.row[1] + 1, rang.column[0] + 1).border = {};
            }
            if (!worksheet.getCell(rang.row[1] + 1, rang.column[1] + 1).border) {
                worksheet.getCell(rang.row[1] + 1, rang.column[1] + 1).border = {};
            }
            if (!worksheet.getCell(rang.row[0] + 1, rang.column[1] + 2).border) {
                worksheet.getCell(rang.row[0] + 1, rang.column[1] + 2).border = {};
            }
            if (!worksheet.getCell(rang.row[1] + 2, rang.column[0] + 1).border) {
                worksheet.getCell(rang.row[1] + 2, rang.column[0] + 1).border = {};
            }
            if (!worksheet.getCell(rang.row[1] + 2, rang.column[1] + 1).border) {
                worksheet.getCell(rang.row[1] + 2, rang.column[1] + 1).border = {};
            }
            if (!worksheet.getCell(rang.row[1] + 1, rang.column[1] + 2).border) {
                worksheet.getCell(rang.row[1] + 1, rang.column[1] + 2).border = {};
            }
            worksheet.getCell(rang.row[0] + 1, rang.column[0] + 1).border.top = template;
            worksheet.getCell(rang.row[0] + 1, rang.column[0] + 1).border.left = template;
            worksheet.getCell(rang.row[0] + 1, rang.column[1] + 1).border.top = template;
            worksheet.getCell(rang.row[0] + 1, rang.column[1] + 2).border.left = template;
            worksheet.getCell(rang.row[1] + 2, rang.column[0] + 1).border.top = template;
            worksheet.getCell(rang.row[1] + 1, rang.column[0] + 1).border.left = template;
            worksheet.getCell(rang.row[1] + 2, rang.column[1] + 1).border.top = template;
            worksheet.getCell(rang.row[1] + 1, rang.column[1] + 2).border.left = template;
            break;
        case 'border-inside':
            for (let i = rang.column[0]; i <= rang.column[1]; i++) {
                for (let j = rang.row[0]; j <= rang.row[1]; j++) {
                    // 最后一列并且不是最后一行并且不是一列的情况只渲染下方
                    if (i === rang.column[1] && rang.column[1] - rang.column[0] !== 0 && j !== rang.row[1]) {
                        if (!worksheet.getCell(j + 2, i + 1).border) {
                            worksheet.getCell(j + 2, i + 1).border = {};
                        }
                        worksheet.getCell(j + 2, i + 1).border.top = template;
                        // 最后一行并且不是最后一列并且不是一行的情况只渲染右方
                    } else if (j === rang.row[1] && rang.row[1] - rang.row[0] !== 0 && i !== rang.column[1]) {
                        if (!worksheet.getCell(j + 1, i + 2).border) {
                            worksheet.getCell(j + 1, i + 2).border = {};
                        }
                        worksheet.getCell(j + 1, i + 2).border.left = template;
                        // 最后一行最后一列只有一行有多列的情况只渲染下方
                    } else if (i === rang.column[1] && j === rang.row[1] && rang.row[1] - rang.row[0] === 0 && rang.column[1] - rang.column[0] !== 0) {
                        if (!worksheet.getCell(j + 2, i + 1).border) {
                            worksheet.getCell(j + 2, i + 1).border = {};
                        }
                        worksheet.getCell(j + 2, i + 1).border.top = template;
                        // 最后一行最后一列只有一列有多行的情况只渲染右方
                    } else if (i === rang.column[1] && j === rang.row[1] && rang.row[1] - rang.row[0] !== 0 && rang.column[1] - rang.column[0] === 0) {
                        if (!worksheet.getCell(j + 1, i + 2).border) {
                            worksheet.getCell(j + 1, i + 2).border = {};
                        }
                        worksheet.getCell(j + 1, i + 2).border.left = template;
                        // 最后一行最后一列有多行多列的情况不渲染
                    } else if (i === rang.column[1] && j === rang.row[1] && rang.row[1] - rang.row[0] !== 0 && rang.column[1] - rang.column[0] !== 0) {
                        console.log('不渲染');
                    } else {
                        if (!worksheet.getCell(j + 2, i + 1).border) {
                            worksheet.getCell(j + 2, i + 1).border = {};
                        }
                        if (!worksheet.getCell(j + 1, i + 1).border) {
                            worksheet.getCell(j + 1, i + 1).border = {};
                        }
                        worksheet.getCell(j + 2, i + 1).border.top = template;
                        worksheet.getCell(j + 1, i + 2).border.left = template;
                    }
                }
            }
            break;
        case 'border-all':
            for (let i = rang.column[0]; i <= rang.column[1]; i++) {
                for (let j = rang.row[0]; j <= rang.row[1]; j++) {
                    worksheet.getCell(j + 1, i + 1).border = { top: template, left: template };
                    if (!worksheet.getCell(j + 2, i + 1).border) {
                        worksheet.getCell(j + 2, i + 1).border = {};
                    }
                    if (!worksheet.getCell(j + 1, i + 2).border) {
                        worksheet.getCell(j + 1, i + 2).border = {};
                    }
                    worksheet.getCell(j + 2, i + 1).border.top = template;
                    worksheet.getCell(j + 1, i + 2).border.left = template;
                }
            }
            break;
        case 'border-horizontal':
            for (let i = rang.column[0]; i <= rang.column[1]; i++) {
                for (let j = rang.row[0]; j <= rang.row[1]; j++) {
                    if (j !== rang.row[1] || rang.row[1] - rang.row[0] === 0) {
                        if (!worksheet.getCell(j + 2, i + 1).border) {
                            worksheet.getCell(j + 2, i + 1).border = {};
                        }
                        worksheet.getCell(j + 2, i + 1).border.top = template;
                    }
                }
            }
            break;
        case 'border-vertical':
            for (let i = rang.column[0]; i <= rang.column[1]; i++) {
                for (let j = rang.row[0]; j <= rang.row[1]; j++) {
                    if (i !== rang.column[1] || rang.column[1] - rang.column[0] === 0) {
                        if (!worksheet.getCell(j + 1, i + 2).border) {
                            worksheet.getCell(j + 1, i + 2).border = {};
                        }
                        worksheet.getCell(j + 1, i + 2).border.left = template;
                    }
                }
            }
            break;
        case 'border-none':
            for (let i = rang.column[0]; i <= rang.column[1]; i++) {
                for (let j = rang.row[0]; j <= rang.row[1]; j++) {
                    worksheet.getCell(j + 1, i + 1).border = null;
                }
            }
            break;
        default:
            break;
    }
};

/**
 * @description: 设置传入的excelborder样式
 * @author: flyer
 * @param {Object} value 样式配置
 */
const borderConvertOld = value => {
    if (!value) {
        return {};
    }
    const luckyToExcel = {
        style: {
            0: 'none',
            1: 'thin',
            2: 'hair',
            3: 'dotted',
            4: 'dashDot',
            5: 'dashDot',
            6: 'dashDotDot',
            7: 'double',
            8: 'medium',
            9: 'mediumDashed',
            10: 'mediumDashDot',
            11: 'mediumDashDotDot',
            12: 'slantDashDot',
            13: 'thick'
        }
    };
    const border = {
        top: { style: luckyToExcel.style[value.t ? value.t.style : 0], color: { argb: (value.t ? value.t.color : '').replace('#', '') } },
        left: { style: luckyToExcel.style[value.l ? value.l.style : 0], color: { argb: (value.l ? value.l.color : '').replace('#', '') } },
        bottom: { style: luckyToExcel.style[value.b ? value.b.style : 0], color: { argb: (value.b ? value.b.color : '').replace('#', '') } },
        right: { style: luckyToExcel.style[value.r ? value.r.style : 0], color: { argb: (value.r ? value.r.color : '').replace('#', '') } }
    };
    return border;
};
export default exportExcel;
