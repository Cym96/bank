package com.bank.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.NumberFormats;
import jxl.write.WritableCellFormat;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bank.domain.Identity;
import com.bank.domain.Stream;
import com.bank.domain.User;
import com.bank.service.StreamService;
import com.bank.service.UserService;

@RequestMapping("/download")
@Controller
public class DownloadStreamXLSConteoller {

	@Autowired
	private StreamService streamService;
	@Autowired
	private UserService userService;

	@RequestMapping("/downloadStreamXLS")
	public void downloadStreamXLS(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		String cardNum = request.getParameter("cardNum");
		List<Stream> streamList = this.streamService.findByCard(cardNum);
		try {
			// 设置下载的内容
			response.setCharacterEncoding("utf-8");
			// 设置响应的类型。MIME协议
			response.setContentType("application/x-xls");
			// 设置响应头。设置下载的文件名称
			response.setHeader("Content-Disposition", "attachment;filename="
					+ new SimpleDateFormat("yyyy_MM_dd").format(new Date())
					+ ".xls");

			OutputStream os = response.getOutputStream();

			WritableWorkbook wwb = Workbook.createWorkbook(os);
			WritableSheet ws = wwb.createSheet("银行卡明细", 1);
			WritableCellFormat wcf = new WritableCellFormat(NumberFormats.TEXT);
			ws.mergeCells(0, 0, 6, 0);
			ws.addCell(new Label(0, 0, "卡号 :" + cardNum + " 明细单 ", wcf));
			int col = 0, row = 1;
			ws.addCell(new Label(col++, row, "序号", wcf));
			ws.addCell(new Label(col++, row, "执行日期", wcf));
			ws.addCell(new Label(col++, row, "交易金额", wcf));
			ws.addCell(new Label(col++, row, "本次余额", wcf));

			ws.addCell(new Label(col++, row, "对方账户", wcf));
			ws.addCell(new Label(col++, row, "对方卡号", wcf));
			ws.addCell(new Label(col++, row, "本次操作", wcf));

			for (Stream stream : streamList) {
				row++;
				col = 0;
				SimpleDateFormat sdf = new SimpleDateFormat(
						"yyyy-MM-dd hh:mm:ss");
				Date streamDate = stream.getStreamTime();
				ws.addCell(new Label(col++, row, row-1 + "", wcf));
				ws.addCell(new Label(col++, row, sdf.format(streamDate), wcf));
				ws.addCell(new Label(col++, row, stream.getStreamMoney()
						.toString(), wcf));
				ws.addCell(new Label(col++, row, stream.getStreamRestmoney()
						.toString(), wcf));
				if(stream.getStreamOrtheruser() != null ){
					User user = this.userService.findById(stream.getStreamOrtheruser());
				    Identity identity = this.userService.findIdentityById(user.getUserIdentity());
					ws.addCell(new Label(col++, row, identity.getIdentityName(), wcf));
				    ws.addCell(new Label(col++, row, stream.getStreamOrthercard(),wcf));
				}else{
					ws.addCell(new Label(col++, row, "", wcf));
					ws.addCell(new Label(col++, row, "", wcf));
				}

				ws.addCell(new Label(col++, row, stream.getStreamText(), wcf));
			}

			wwb.write();
			wwb.close();
		} catch (WriteException e) {
			e.printStackTrace();
		}

	}

	public StreamService getStreamService() {
		return streamService;
	}

	public void setStreamService(StreamService streamService) {
		this.streamService = streamService;
	}

	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

}
