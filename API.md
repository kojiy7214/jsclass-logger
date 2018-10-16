## Modules

<dl>
<dt><a href="#module_jsclass-logger">jsclass-logger</a></dt>
<dd><p>Simple and easy to use logger.</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#Logger">Logger</a></dt>
<dd><p>Logger class.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getLogger">getLogger(desc)</a> ⇒ <code><a href="#Logger">Logger</a></code></dt>
<dd><p>Get logger instance. supprted options are as below.<br>
-debug: true / false
-toFile: true / false
-outDir: directory to output log file, by default it is &quot;./log/&quot;
-rotate: function to check when to rotate log file, should return true / false.
-generation: log files to keep on disk
-ts: timestamp format in YYYYMMDDhhmmsszzz format</p>
</dd>
</dl>

<a name="module_jsclass-logger"></a>

## jsclass-logger
Simple and easy to use logger.

<a name="Logger"></a>

## Logger
Logger class.

**Kind**: global class  

* [Logger](#Logger)
    * [.trace(msg)](#Logger+trace)
    * [.trace(msg)](#Logger+trace)
    * [.trace(msg)](#Logger+trace)
    * [.trace(msg)](#Logger+trace)
    * [.error(msg)](#Logger+error)

<a name="Logger+trace"></a>

### logger.trace(msg)
Output log at DEBUG level, which is a debug level.

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>any</code> | Log message. |

<a name="Logger+trace"></a>

### logger.trace(msg)
Output log at INFO level, which is a production level.

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>any</code> | Log message. |

<a name="Logger+trace"></a>

### logger.trace(msg)
Output log at WARN level, which is a production level.

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>any</code> | Log message. |

<a name="Logger+trace"></a>

### logger.trace(msg)
Output log at TRACE level, which is a debug level.

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>any</code> | Log message. |

<a name="Logger+error"></a>

### logger.error(msg)
Output log at ERROR level, which is a production level.

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>any</code> | Log message. |

<a name="getLogger"></a>

## getLogger(desc) ⇒ [<code>Logger</code>](#Logger)
Get logger instance. supprted options are as below.<br>
-debug: true / false
-toFile: true / false
-outDir: directory to output log file, by default it is "./log/"
-rotate: function to check when to rotate log file, should return true / false.
-generation: log files to keep on disk
-ts: timestamp format in YYYYMMDDhhmmsszzz format

**Kind**: global function  
**Returns**: [<code>Logger</code>](#Logger) - Logger instance  

| Param | Type | Description |
| --- | --- | --- |
| desc | <code>option</code> | Logger option. |

