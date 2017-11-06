<#ftl strip_whitespace=true>
<#--
 * main-include.ftl
 *
 * Contains macros for app specific widgets.
 -->

<#--
 * form
 *
 * Creates a form tag and adds CSRF support if available.
 -->
<#macro form action method="POST" name="" >
    <#if name != "" >
        <#assign nameAttribute = "name=\"" + name + "\"">
    <#else>
        <#assign nameAttribute = "">
    </#if>
<form action="${action}" method="${method}" ${nameAttribute} >
    <#if _csrf?? >
        <!-- include csrf token -->
        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
    </#if>
</#macro>
