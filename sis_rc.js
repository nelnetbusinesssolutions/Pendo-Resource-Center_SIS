const mTKey = '94a14ddae2e807d4b743bda48a9124d7352bc7ce95e766992d6525190756ffdc';

/* ***Guide Center Display Functions*** */
class KnowledgebaseArticle {
    constructor(title, id) {
        this.title = title;
        this.id = id;
        this.content = '';
    }

    //Adds a button to the Guide Center. When clicked, the button reveals the article content.
    addToGuideCenter() {
        let kbaButton = document.createElement('BUTTON'),
            articleButtonDiv = document.querySelector('._pendo-launcher-guide-listing'),
            articleTitle = this.title,
            articleID = this.id,
            articleHTML;
        kbaButton.classList.add('_pendo-launcher-item_');
        kbaButton.textContent = articleTitle;
        articleButtonDiv.appendChild(kbaButton);
        kbaButton.addEventListener('click', function() {
            getContent(articleID)
            .then( html =>  displayArticle(articleTitle, html, articleID));
        });
    }
}

//Initialize adding page and all subpages of entered pageId to the guide center.
function init(pageId) {
    getPage(pageId)
    .then(page=>addTopics(page));
    getSubpages(pageId);
}

//If the page is a topic, create a KnowledgeBaseArticle and add it to the Guide Center.
//Also retrieve its subpages to check for topics.
function addTopics(v) {
    if (v.article == 'topic') {
        let kba = new KnowledgebaseArticle(v.title, v['@id']);
        kba.addToGuideCenter();
    }
    if (v['@subpages'] == 'true') {
        getSubpages(v['@id']);
    };
}

//Create a div with the HTML content of the article
function displayArticle(title, content, id) {
    let kbaDiv = document.createElement('DIV'),
    	articleContent = document.querySelector('.article-content'),
    	articleTitle = document.createElement('H2'),
    	articleText = document.createElement('SECTION'),
    	articleDisplay = document.querySelector('.article-display'),
    	buttonDiv = document.querySelector('._pendo-launcher-guide-listing');
    articleContent.innerHTML = '';
    articleTitle.innerHTML = title;
    articleText.innerHTML = content;
    articleContent.appendChild(kbaDiv);
    kbaDiv.appendChild(articleTitle);
    kbaDiv.appendChild(articleText);
    buttonDiv.style.display = 'none';
    articleDisplay.scrollTop = 0;
    articleDisplay.style.display = 'block';
    formatArticle();
    addHelpLink(id);
}

//Return to article list
const backButton = document.querySelector('.back-to-article-list');
backButton.addEventListener('click', displayList);

function displayList() {
    let articleDisplay = document.querySelector('.article-display'),
    	buttonDiv = document.querySelector('._pendo-launcher-guide-listing'),
        containerDiv = document.querySelector('._pendo-launcher-section-body_');
    buttonDiv.style.display = 'flex';
    containerDiv.scrollTop = 0;
    articleDisplay.style.display = 'none';
}

//Add link to help article in full SIS Help site
function addHelpLink(id) {
    let helpLink = document.querySelector('.to-help');
    getPage(id)
    .then(myjson=>helpLink.setAttribute('href', myjson['uri.ui']));
}

/* ***MindTouch API Integration Functions*** */
//Get the entered page and add it to the resource center
const getPage = function(pageId) {
    return fetch(`https://rwu.renweb.com/@api/deki/pages/${pageId}?dream.out.format=json`, {
        headers: {
            'X-Deki-Token': mTKey
        },
        credentials: 'include'
    })
    .then(response=>response.json());
};

//Get all the subpages of a certain article and add them to the resource center
const getSubpages = function(pageId) {
    return fetch(`https://rwu.renweb.com/@api/deki/pages/${pageId}/subpages?dream.out.format=json`, {
        headers: {
            'X-Deki-Token': mTKey
        },
        credentials: 'include'
    })
    .then(response=>response.json()).then(myjson=>myjson['page.subpage'])
    .then(subpages=>{
        if (Array.isArray(subpages)) {
            subpages.forEach((v)=>addTopics(v));
        } else if (subpages != undefined) {
            addTopics(subpages);
        }
    });
};

//Get the HTML content of a certain article
const getContent = function(pageId) {
    return fetch(`https://rwu.renweb.com/@api/deki/pages/${pageId}/contents?dream.out.format=json`, {
        headers: {
            'X-Deki-Token': mTKey
        },
        credentials: 'include'
    })
    .then(response=>response.json())
    .then(myjson=>myjson['body'][0]);
};

/* ***Initialize*** */
//Page IDs
//Polyfill for includes and startsWith



const screens = [
{
	name: 'Home',
	host: 'renweb1',
	path: '/renweb1/',
	hash: ['#/Home'],
	id: 3148 //Getting Started page
},

{
	name: 'Students',
	host: 'renweb1',
	path: '/renweb1/',
	hash: ['#/peoplemanagement/?personFilterType=0', '#/peoplemanagement/student', '#/peoplemanagement/?redirect=report_card', '#/peoplemanagement/?redirect=student_attendance'],
	id: 11292 //Students page
},

{
	name: 'Families',
	host: 'renweb1',
	path: '/renweb1/',
	hash: ['#/peoplemanagement/?personFilterType=1', '#/peoplemanagement/family', '#/peoplemanagement/parent'],
	id: 11281 //Families page
},

{
	name: 'Staff',
	host: 'renweb1',
	path: '/renweb1/',
	hash: ['#/peoplemanagement/?personFilterType=2', '#/peoplemanagement/staff'],
	id: 11548 //Staff page
},

{
	name: 'Academics',
	host: 'renweb1',
	path: '/renweb1/',
	hash: ['#/AcademicsCourses', '#/AcademicsClasses', '#/honorroll', '#/GradeCalculator', '#/GraduationPlanner'],
	id: 9154 //Academics page
},

{
	name: 'Admissions | Dashboard',
	host: 'renweb1',
	path: '/renweb1/',
	hash: ['#/enrollmentDashboard'],
	id: 11557 //Admissions page
},

{
	name: 'Attendance',
	host: 'renweb1',
	path: '/renweb1/',
	hash: ['#/attendancebygroup', '#/ConvertTardiesToAbsent'],
	id: 828 //Attendance page
},

{
	name: 'Cafeteria | Lunch Configuration',
	host: 'renweb1',
	path: '/renweb1/',
	hash: ['#/lunchconfig'],
	id: 10073 //Lunch Configuration page
},

{
	name: 'Cafeteria',
	host: 'renweb1',
	path: '/renweb1/',
	hash: ['#/lunchverification', '#/stafflunch'],
	id: 10069 //Cafeteria page
},

{
	name: 'Cash Register | Inventory',
	host: 'renweb1',
	path: '/renweb1/',
	hash: ['#/cashregister/inventory'],
	id: 9075 //Cash Register page
},

{
	name: 'ParentsWeb',
	host: 'renweb1',
	path: '/renweb1/',
	hash: ['#/ParentsWebConfiguration'],
	id: 11363 //ParentsWeb page
},

{
	name: 'Report Manager',
	host: 'renweb1',
	path: '/renweb1/',
	hash: ['#/ReportManager_Gap'],
	id: 8870 //Report Manager page
},

{
	name: 'Scheduling',
	host: 'renweb1',
	path: '/renweb1/',
	hash: ['#/scheduling'],
	id: 9192 //Scheduling page
},

{
	name: 'Security',
	host: 'renweb1',
	path: '/renweb1/',
	hash: ['#/securityGroup', '#/Security/login-management', '#/Security/Settings'],
	id: 10162 //Security page
},

{
	name: 'System | Configuration',
	host: 'renweb1',
	path: '/renweb1/',
	hash: ['#/configuration'],
	id: 830 //Configuration page
},

{
	name: 'System | Database Tasks',
	host: 'renweb1',
	path: '/renweb1/',
	hash: ['#/databaseTasks'],
	id: 9159 //Database Tasks page
},

{
	name: 'System | Donate Online',
	host: 'renweb1',
	path: '/renweb1/',
	hash: ['#/DonateOnline'],
	id: 9158 //System page
},

{
	name: 'System | Maintenance Manager',
	host: 'renweb1',
	path: '/renweb1/',
	hash: ['#/MaintenanceManager'],
	id: 9107 //Maintenance Manager page
},

{
	name: 'System | Student Time Clock',
	host: 'renweb1',
	path: '/renweb1/',
	hash: ['#/TimeClock/Student'],
	id: 10856 //Student Time Clock page
},

{
	name: 'System | Web Forms',
	host: 'renweb1',
	path: '/renweb1/',
	hash: ['#/WebForms'],
	id: 9541 //Web Forms page
},

{
	name: 'Classroom',
	host: 'renweb1',
	path: '/classroom/',
	hash: ['#/'],
	id: 9102 //Classroom page
},

{
	name: 'Admissions | OA',
	host: 'client',
	path: '/oa/admin/approve2.cfm',
	hash: [''],
	id: 3614 //OA page
},

{
	name: 'Admissions | OE',
	host: 'client',
	path: '/oa/admin/enrollment/approve2.cfm',
	hash: [''],
	id: 3619 //OE page
},

{
	name: 'Admissions | Inquiry',
	host: 'client',
	path: '/oa/admin/request_info_queue.cfm',
	hash: [''],
	id: 11887 //Online Inquiry page
},

{
	name: 'Medical',
	host: 'renweb1',
	path: '/cashmedical1/',
	hash: ['#/medical'],
	id: 9287 //Medical page
},

{
	name: 'Cash Register | Cash Register',
	host: 'renweb1',
	path: '/cashmedical1/',
	hash: ['#/cashregister'],
	id: 9075 //Cash Register page
},

{
	name: 'Cash Register | FACTS Cash Register Configuration',
	host: 'renweb1',
	path: '/factscashregister/',
	hash: ['#/cashregister'],
	id: 9075 //Cash Register page
},

{
	name: 'Communications',
	host: 'renweb1',
	path: '/communication/',
	hash: ['#/communication'],
	id: 11162 //Communications page
},

{
	name: 'Incidental Billing',
	host: 'billing-charges',
	path: '/',
	hash: [''],
	id: 13542 //Incidental Billing page
},

{
	name: 'Student Billing',
	host: 'student-billing',
	path: '/',
	hash: ['#/'],
	id: 9294 //Student Billing page
}
]

let host = window.location.host,
	path = window.location.pathname,
	hash = window.location.hash,
    pageId;

screens.forEach(function(v) {
	v.hash.forEach(function(x, i) {
		if (host.includes(v.host) && path == v.path && hash.startsWith(v.hash[i])) {
			pageId = v.id;
		}
	})
})

init(pageId);

/* Styling for Articles */
function formatArticle() {
    formatImages();
    formatSisLinks();
    removeVideoHeader();
}

//Removes style attribute from images, tables, and tds to adjust sizing
function formatImages () {
	let sizedElements = document.querySelectorAll('.article-content img, .article-content table, .article-content td'),
        elementArray = Array.prototype.slice.call(sizedElements);
    elementArray.forEach(function(el) {
        el.removeAttribute('style');
        el.removeAttribute('width');
        el.removeAttribute('height');
    });
}

//Tells SIS Help internal links to open in a new tab
function formatSisLinks() {
    let sisLinks = document.querySelectorAll('.article-content a[rel="internal"]'),
        sisLinksArray = Array.prototype.slice.call(sisLinks);
    sisLinksArray.forEach(function(a) {
        a.setAttribute('target', '_blank');
    });
}

//Removes headers for Video sections of articles. Video is hidden via CSS
function removeVideoHeader() {
    let headers = document.querySelectorAll('.article-content h2'),
        headersArray = Array.prototype.slice.call(headers);
    headersArray.forEach(function(header) {
        console.log(header.textContent);
        if (header.textContent == 'Video ' || header.textContent == 'Video' || header.textContent == ' Video') {
            header.style.display = 'none';
        }
    })
}
