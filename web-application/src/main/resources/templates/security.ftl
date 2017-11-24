<#ftl strip_whitespace=true>
<#--
 * security.ftl
 *
 * Contains macros for Spring Security integration.
 * Currently Spring Security only supports JSP tag libs.
 * See https://stackoverflow.com/questions/31893767/spring-security-context-for-freemarker
 * for some info on what can be accessed.
 -->

<#--
 * authorize
 *
 * Show nested content if authorized
 -->
<#macro authorize ifAnyGranted>
    <#assign authorized = false>
    <#list Session["SPRING_SECURITY_CONTEXT"].authentication.authorities as authority>
    <#if authority == ifAnyGranted>
        <#assign authorized = true>
    </#if>
    </#list>
<#if authorized>
    <#nested>
</#if>
</#macro>
