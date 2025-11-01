package com.ruoyi.web.controller.user;


import com.ruoyi.common.constant.Constants;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.domain.model.LoginBody;
import com.ruoyi.framework.web.service.SysLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserLoginController {
    @Autowired
    private SysLoginService loginService;

    @PostMapping("/login")
    public AjaxResult userLogin(@RequestBody LoginBody loginBody) {
        // 可复用 SysLoginService 的登录逻辑，或针对用户端单独实现
        String token = loginService.login(loginBody.getUsername(), loginBody.getPassword());
        return AjaxResult.success(Constants.TOKEN, token);
    }
}
