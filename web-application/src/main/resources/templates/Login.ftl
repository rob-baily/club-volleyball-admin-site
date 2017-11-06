<#import "main-include.ftl" as main />

<html>
<!-- if no activity in 10 minutes then refresh to avoid CSRF token expiration -->
<META HTTP-EQUIV="REFRESH" CONTENT="600">
<style>
    #content { width: 300px; margin: auto; }
    #image { text-align: center; }
    fieldset { display: inline-block; padding-left: 20px; padding-right: 20px }
    .alert { font-weight: bold; margin-bottom: 10px }
    .alert-error { color: red }
    .alert-success {color: green }
    .form-actions { text-align: center; margin: 5px; }
</style>
<title>BRYC Admin Site Login</title>
<body onload='document.loginForm.username.focus();'>
<div id="content">
    <div id="image">
        <img src="/images/BRYCLogo.png" height="45" align="middle"/>
    </div>
    <@main.form action="/login" name="loginForm" />
        <fieldset>
            <legend>Please Login</legend>
            <#if RequestParameters.error??>
                <div class="alert alert-error">
                Invalid username and password.
                </div>
            <#elseif RequestParameters.logout??>
                <div class="alert alert-success">
                You have been logged out.
                </div>
            </#if>
            <label for="username">Username</label>
            <input type="text" id="username" name="username" size="30"/>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" size="30"/>
            <div class="form-actions">
                <button type="submit" class="btn">Log in</button>
            </div>
        </fieldset>
    </form>
</div>
</body>
</html>