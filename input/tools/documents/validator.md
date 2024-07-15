<head>
    <title>HTML Validator | Vale.Rocks</title>
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js"></script>
</head>

<section>
    <h2>HTML Validator</h2>
    <p>This is a frontend for the <a href="https://validator.w3.org/nu">Nu HTML Checker</a>.</p>
    <form id="validatorForm">
        <div>
            <label for="url">Enter URL to validate:</label>
            <input type="url" id="url" placeholder="https://example.com">
        </div>
        <div>
            <label for="html">Or paste HTML code:</label>
            <textarea id="html" placeholder="<html>&#10;    <head>&#10;            ...&#10;      </head>&#10;      <body>&#10;            ...&#10;      </body>&#10;</html>"></textarea>
        </div>
        <div>
            <label for="userAgent">User-Agent:</label>
            <input type="text" id="userAgent" placeholder="Validator.nu/LV https://validator.w3.org/services">
        </div>
        <div>
            <label for="outputFormat">Output Format:</label>
            <select id="outputFormat">
                <option value="html">HTML</option>
                <option value="xml">XML</option>
                <option value="gnu">GNU</option>
                <option value="text">Text</option>
                <option value="json">JSON</option>
            </select>
        </div>
        <div>
            <input type="checkbox" id="showSource">
            <label for="showSource">Display source HTML</label>
        </div>
        <button type="button" id="validateButton">Validate</button>
    </form>
</section>
<section>
    <div>
        <h3>Results:</h3>
        <pre id="results">Results of your validation will appear here.</pre>
    </div>
    <div id="source-section" style="display:none">
        <h3>Source:</h3>
        <pre id="source">The source of your inputted content will appear here.</pre>
    </div>
</section>

<script src="/scripts/validator.js"></script>
