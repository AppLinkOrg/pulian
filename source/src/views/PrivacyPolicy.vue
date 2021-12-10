<script setup>
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { ref } from "vue";
import { Utils } from "../Utils";
let page = ref({});
let data = ref({});
PageHelper.Init(page, () => {});
HttpHelper.Post("page/privacypolicy", {}).then((ret) => {
  data.value = ret;
});
</script>

<template>
  <div v-if="page.Res != null && page.Inst != null && page.Text != null">
    <!-- 第一部分 -->
    <div class="firstcontent" style="background-color: #fff">
      <div class="HeaderSkewed__Content">
        <div class="HeaderContent">
          <h1 class="HeaderContentTitleCenter__Title">
            <div class="textblock" v-html="Utils.HtmlDecode(data.title)"></div>
          </h1>
          <div class="HeaderContentTitleCenterChildren__Children">
            <div class="jumbotron-card jumbotron-card--white-spaced">
              <div>
                <p>
                  This policy is one way of sustaining your trust in GoodLeap,
                  LLC, our products and services. Our privacy policy describes
                  how we collect, protect, and use information about you during
                  your visit on our website.
                </p>
                <p>
                  At all times, we reserve the right to disclose any
                  information, including personally identifiable information, to
                  comply with any applicable law, regulation, legal process or
                  governmental request; to protect GoodLeap rights or property
                  (including without limitation in the event of a transfer of
                  control of a GoodLeap company, affiliate, or brand, or
                  substantially all of its assets), or during an emergency when
                  safety is at risk, or for credit fraud protection and risk
                  reduction purposes.
                </p>
              </div>
            </div>
          </div>
          <!-- <div class="textblock" v-html="Utils.HtmlDecode(data.explain)"></div> -->
        </div>
      </div>
      <div class="HeaderSkewed__Background">
        <div
          class="
            HeaderSkewed__BackgroundImage HeaderSkewed__BackgroundImage--desktop
          "
          :style="{
            backgroundImage:
              'url(' + page.uploadpath + 'privacypolicy/' + data.bgimg + ')',
          }"
        ></div>
      </div>
    </div>
    <!-- 第二部分 -->
    <div class="cecondcontent">
      <div class="Block Block--regular-topless" style="z-index: 10">
        <div class="Block__guides">
          <div class="background-guides background-guides--1"></div>
        </div>
        <div class="Block__content">
          <div class="wrapper wrapper--tracking">
            <div class="content-grid content-grid--privacy">
              <div class="content-grid__block">
                <h2 class="heading heading--h3-smaller-bottom">
                  <a href="#headingslim9">
                    <span>california privacy rights notice</span>
                    <small>(info below)</small>
                  </a>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Block Block--regular-topless" style="z-index: 10">
        <div class="Block__guides">
          <div class="background-guides background-guides--1"></div>
        </div>
        <div class="Block__content">
          <div class="wrapper wrapper--tracking">
            <div class="content-grid content-grid--slim">
              <div class="content-grid__block">
                <h2 class="heading heading--h3-static" id="headingslim1">
                  Information Collection and Use
                </h2>
              </div>
              <div class="content-grid__block">
                <div class="rawHtmlStyled rawHtmlStyled--slim">
                  <p>
                    We collect information about you to help us serve your
                    financial needs, to provide you with quality products and
                    services, and to fulfill legal and regulatory requirements.
                    We consider all information about you in our possession to
                    be personal information, even if you cease to be a customer.
                    Typically, we collect this information on applications and
                    other forms you complete, through conversations you may have
                    with our loan professionals, with other representatives, and
                    in some cases, over our website. We may also collect
                    information from a wide range of ther sources in order to
                    process and/or underwrite your loan application. These
                    sources may include among others, employers, attorneys,
                    banks, title insurers, insurance companies, and credit
                    reporting agencies. This information may include your name,
                    address, phone number, email address, social security
                    number, and account numbers.
                  </p>
                  <p>
                    We do not sell or rent customer information. We share
                    customer information with certain employees, and with
                    companies providing services on our behalf in order to
                    service your needs. Our policy is to require all employees
                    and companies providing services on our behalf, to keep
                    customer information confidential. Our privacy policy
                    applies to potential customers, as well as current and
                    former customers.
                  </p>
                  <p>
                    We may also collect, store or accumulate certain
                    non-personally identifiable information concerning your use
                    of this website, such as information regarding which of our
                    pages are most popular. Information gathered may be used in
                    aggregate form for internal business purposes, such as
                    generating statistics and developing marketing plans. We may
                    share or transfer such aggregate, non-personally
                    identifiable information with or to our affiliates.
                  </p>
                  <p>
                    When you fill-out a form on our website, we capture your
                    IP-address. This enables us to track and prevent fraudulent
                    attacks against our website as a security precaution and may
                    be used to prevent fraudulent applications. We do not use
                    your IP-address to contact you.
                  </p>
                </div>
              </div>
            </div>
            <div class="content-grid content-grid--slim">
              <div class="content-grid__block">
                <h2 class="heading heading--h3-static" id="headingslim2">
                  Special Note to Parents
                </h2>
              </div>
              <div class="content-grid__block">
                <div class="rawHtmlStyled rawHtmlStyled--slim">
                  <p>
                    This website is intended for adults. We do not knowingly
                    collect personal information from children under the age of
                    13. However, if the parent or guardian of a child under 13
                    believes that the child has provided us with personally
                    identifiable information, the parent or guardian of that
                    child should contact us immediately at<!-- -->
                    <a
                      href="mailto:privacy@goodleap.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      privacy@goodleap.com
                    </a>
                    <!-- -->
                    if they want this information deleted from our files, so
                    that it is not in retrievable form. If we otherwise obtain
                    knowledge that we have personally identifiable information
                    about a child under 13 in retrievable form in our files, we
                    will delete the information from our existing files so that
                    it is not retrievable.
                  </p>
                </div>
              </div>
            </div>
            <div class="content-grid content-grid--slim">
              <div class="content-grid__block">
                <h2 class="heading heading--h3-static" id="headingslim3">
                  nsuring Your Security
                </h2>
              </div>
              <div class="content-grid__block">
                <div class="rawHtmlStyled rawHtmlStyled--slim">
                  <p>
                    We have adopted policies and procedures designed to protect
                    your personal information from unauthorized use or
                    disclosure.
                  </p>
                  <p>
                    We have implemented physical, electronic, and procedural
                    safeguards to maintain confidentiality and integrity of the
                    personal information in our possession, and to guard against
                    unauthorized access. These include among other things,
                    procedures for controlling access to customer files,
                    building security programs, and information technology
                    security measures such as the use of passwords, firewall,
                    plus virus and use detection software. We continue to access
                    new technology as it becomes available, and to upgrade our
                    physical and electronic security systems as appropriate.
                  </p>
                  <p>
                    Our policy is to permit employees to access your personal
                    information only if they have a business purpose for using
                    such information, such as administering, providing or
                    developing our products or services. Our policy governs the
                    conduct of all of our employees and third-party vendors, to
                    safeguard personal information about consumers, and
                    customers we serve or have served in the past.
                  </p>
                </div>
              </div>
            </div>
            <div class="content-grid content-grid--slim">
              <div class="content-grid__block">
                <h2 class="heading heading--h3-static" id="headingslim4">
                  Sharing Information With Companies That Provide Services For
                  Us
                </h2>
              </div>
              <div class="content-grid__block">
                <div class="rawHtmlStyled rawHtmlStyled--slim">
                  <p>
                    We share personal information about you, as required or
                    permitted by law, with affiliates and third-parties such as,
                    service providers who assist us in the day-to-day operations
                    of our company in the administration, processing, servicing,
                    and sale of your loan. These affiliates and third-parties
                    include among others, title companies, appraisers, insurance
                    companies, underwriting services, processing services,
                    printing companies, software providers, marketing services,
                    and purchasers of loans. Our policy is to require affiliates
                    and third-party service providers to enter into
                    confidentiality agreements with us, prohibiting them from
                    using any personal information they obtain for any other
                    purpose, other than those for which they were retained or as
                    required by law. We may also disclose information about you,
                    when necessary or required, in legal and arbitration
                    proceedings, and to government agencies.
                  </p>
                </div>
              </div>
            </div>
            <div class="content-grid content-grid--slim">
              <div class="content-grid__block">
                <h2 class="heading heading--h3-static" id="headingslim5">
                  Technology Utilized
                </h2>
              </div>
              <div class="content-grid__block">
                <div class="rawHtmlStyled rawHtmlStyled--slim">
                  <p>
                    There are two commonly used technologies used on this site,
                    clear gifs and cookies. We use these to monitor the
                    performance and effectiveness of the site. “Cookies” are
                    small pieces of information stored by our browser on your
                    computer’s hard drive. We do not use cookies to obtain any
                    personally identifying information. Most web browsers
                    automatically accept cookies, but you can usually change
                    your browser settings to prevent this. Please be assured
                    that accepting a cookie does not give us access to your
                    computer or personal information under any circumstances. If
                    you disable cookies, you may be unable to use some features
                    of our site. If you experience any problems with our
                    website, please click here<!-- -->
                    <a href="/bugs"> “Report a Bug”</a>, and report the issue
                    encountered.
                  </p>
                  <p>
                    Clear gifs are tiny graphics with a unique identifier,
                    similar in function to cookies, and are used to track the
                    online movements of Web users. Clear gifs are not tied to
                    users’ personally identifiable information.
                  </p>
                </div>
              </div>
            </div>
            <div class="content-grid content-grid--slim">
              <div class="content-grid__block">
                <h2 class="heading heading--h3-static" id="headingslim6">
                  Notification of Changes
                </h2>
              </div>
              <div class="content-grid__block">
                <div class="rawHtmlStyled rawHtmlStyled--slim">
                  <p>
                    We may revise this Privacy Policy from time to time. If we
                    decide to change our Privacy Policy, we will post the
                    revised policy here. As we may make changes at any time
                    without notifying you, we suggest that you periodically
                    consult this Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
            <div class="content-grid content-grid--slim">
              <div class="content-grid__block">
                <h2 class="heading heading--h3-static" id="headingslim7">
                  Your Consent
                </h2>
              </div>
              <div class="content-grid__block">
                <div class="rawHtmlStyled rawHtmlStyled--slim">
                  <p>
                    Your continued participation on this website indicates your
                    acceptance of this Privacy Policy, and of the collection,
                    use, disclosure, management, and storage of your personal
                    information as described above. We may from time-to-time,
                    transfer or merge any personal information collected offline
                    to our online databases or store offline information in an
                    electronic format. We may also combine personal information
                    we collect online with information available from other
                    sources.
                  </p>
                </div>
              </div>
            </div>
            <div class="content-grid content-grid--slim">
              <div class="content-grid__block">
                <h2 class="heading heading--h3-static" id="headingslim8">
                  Contacting Us
                </h2>
              </div>
              <div class="content-grid__block">
                <div class="rawHtmlStyled rawHtmlStyled--slim">
                  <p>
                    If you have any questions about this privacy policy, please
                    contact us by mail at:
                  </p>
                  <p>
                    GoodLeap<br />Attn: Compliance Department<br />8781 Sierra
                    College Blvd.<br />Roseville, CA 95661<br />
                  </p>
                  <p>
                    Effective Date of this Policy:<br />This policy was last
                    revised on 5/11/2020 and takes effect immediately, and is in
                    effect until further revised.
                  </p>
                </div>
              </div>
            </div>
            <div class="content-grid content-grid--slim">
              <div class="content-grid__block">
                <h2 class="heading heading--h3-static" id="headingslim9">
                  California Privacy Rights Notice
                </h2>
              </div>
              <div class="content-grid__block">
                <div class="rawHtmlStyled rawHtmlStyled--slim">
                  <p>
                    This California Privacy Rights Notice supplements the
                    information contained in GoodLeap’s Privacy Policy (<a
                      href="/privacy"
                      >goodleap.com/privacy</a
                    >) and applies to California residents (“consumers” or
                    “you”). If you are a California resident, then you have
                    certain rights under the California Consumer Privacy Act
                    (“CCPA”) regarding Personal Information.
                  </p>
                  <p class="subtitle">Right to Know</p>
                  <p>
                    You have the right to know and see what data we have
                    collected about you over the past 12 months, including:
                  </p>
                  <ul>
                    <li>
                      The categories of Personal Information we have collected
                      about you (see<!-- -->
                      <a href="#categories-of-information-we-collect"
                        >Categories of Information We Collect</a
                      >
                      <!-- -->below)
                    </li>
                    <li>
                      The categories of sources from which the Personal
                      Information is collected (see Categories of<!-- -->
                      <a href="#sources-for-personal-information"
                        >Sources for Personal Information</a
                      >
                      <!-- -->below)
                    </li>
                    <li>
                      Our business or commercial purpose for collecting your
                      Personal Information (see<!-- -->
                      <a
                        href="#purposes-for-collection-and-use-of-personal-information"
                        >Purposes for Collection and Use of Personal
                        Information</a
                      >
                      <!-- -->below)
                    </li>
                    <li>
                      The categories of third parties with whom we have shared
                      your Personal Information (see<!-- -->
                      <a href="#SharingPersonalInformation"
                        >Sharing of Information</a
                      >
                      <!-- -->below) and
                    </li>
                    <li>
                      The Personal Information we have collected specifically
                      about you (see<!-- -->
                      <a href="#exercising-your-rights"
                        >Exercising Your Rights</a
                      >
                      <!-- -->below).
                    </li>
                  </ul>
                  <p class="subtitle">Right to Delete</p>
                  <p>
                    You have the right to request that we delete the Personal
                    Information we have collected from you (and direct our
                    Service Providers to do the same). There are a number of
                    exceptions, however, that include, but are not limited to,
                    when the information is necessary for us to do any of the
                    following:
                  </p>
                  <ul>
                    <li>Complete your transaction;</li>
                    <li>Provide services to you;</li>
                    <li>Perform a contract between us and you;</li>
                    <li>
                      Protect your security and prosecute those responsible for
                      breaching it;
                    </li>
                    <li>Fix our systems in the case of a bug;</li>
                    <li>Comply with a legal obligation; or</li>
                    <li>
                      Make other internal and lawful uses of the information
                      that are compatible with the context in which you provided
                      it.
                    </li>
                  </ul>
                  <p class="subtitle">
                    Right to Prohibit Sales of Your Information
                  </p>
                  <p>
                    California law requires that we provide transparency about
                    personal information we “sell,” defined as GoodLeap sharing
                    personal information with third parties in exchange for
                    valuable consideration.
                  </p>
                  <p>
                    In the preceding twelve (12) months, GoodLeap has not sold
                    your Personal information.
                  </p>
                  <p>
                    We will provide notice to you prior to any change to our “No
                    Sales” policy. In addition, you may pro-actively prohibit
                    any such future sales of your Personal Information by us,
                    see “Exercising Your Rights” below.<!-- -->
                  </p>
                  <p class="subtitle" id="exercising-your-rights">
                    Exercising Your Rights
                  </p>
                  <p>
                    To exercise your specific Right to Know, or your Right to
                    Delete, please submit a verifiable consumer request to us by
                    email to<!-- -->
                    <a
                      href="mailto:customerservice@goodleap.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      >customerservice@goodleap.com</a
                    >
                    <!-- -->or by calling us at<!-- -->
                    <a
                      href="tel:1-844-562-6725"
                      target="_blank"
                      rel="noopener noreferrer"
                      style="color: #555555"
                      >1-844-562-6725</a
                    >.
                  </p>
                  <p>
                    To exercise your Right to Prohibit the Sales of your
                    Personal Information (including future sales) please (a)
                    click the link<!-- -->
                    <a href="/do-not-sell-my-information"
                      >Do Not Sell My Personal Information</a
                    >
                    <!-- -->or (b) submit a verifiable consumer request to us by
                    email to<!-- -->
                    <a
                      href="mailto:customerservice@goodleap.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      >customerservice@goodleap.com</a
                    >
                    <!-- -->or by calling us at<!-- -->
                    <a
                      href="tel:1-844-562-6725"
                      target="_blank"
                      rel="noopener noreferrer"
                      style="color: #555555"
                      >1-844-562-6725</a
                    >.
                  </p>
                  <p>
                    Only you, or someone legally authorized to act on your
                    behalf, may exercise these rights related to your Personal
                    Information. Such a request must:
                  </p>
                  <ul>
                    <li>
                      Provide sufficient information that allows us to
                      reasonably verify you are the person about whom we
                      collected Personal Information or an authorized
                      representative.
                    </li>
                    <li>
                      Describe your request with sufficient detail that allows
                      us to properly understand, evaluate, and respond to it.
                    </li>
                  </ul>
                  <p>
                    We cannot respond to your request or provide you with the
                    specific Personal Information we have if we cannot verify
                    your identity or authority to make the request and confirm
                    the Personal Information relates to you. We will verify your
                    request(s) by having you provide your name, address and
                    contact information. We will then request additional
                    identification verification to confirm your identity and/or
                    the identity and authority of your authorized
                    representative.
                  </p>
                  <p>
                    We will not discriminate against you for exercising any of
                    your CCPA rights described above. Unless permitted by the
                    CCPA, we will not deny you goods or services; charge you
                    different prices or rates for goods or services; provide you
                    a different level or quality of goods or services; or
                    suggest that you may receive a different price or rate for
                    goods or services or a different level or quality of goods
                    or services.
                  </p>
                  <p class="subtitle" id="categories-of-information-we-collect">
                    Categories of Information We Collect
                  </p>
                  <p>
                    GoodLeap collects information that identifies, relates to,
                    describes, references, is capable of being associated with,
                    or could reasonably be linked, directly or indirectly, with
                    a particular consumer or household (“Personal Information”).
                  </p>
                  <p>
                    Specifically, we directly and/or through our website, mobile
                    applications, or other online systems (“Systems”) have
                    collected the following categories of Personal Information
                    from consumers within the last twelve (12) months:
                  </p>
                  <ul>
                    <li>
                      Personal unique identifiers (SSN, name, drivers license,
                      passport number)
                    </li>
                    <li>
                      Personal information, including contact details, financial
                      information
                    </li>
                    <li>
                      Protected classification characteristics under California
                      or federal law, such as sex or marital status
                    </li>
                    <li>Purchase or other commercial information</li>
                    <li>
                      Biometric information; Geo-location information, Sensory
                      information
                    </li>
                    <li>
                      Internet or online information, information regarding
                      interactions with our websites, applications, or
                      advertisements
                    </li>
                    <li>Employment or education-related information</li>
                    <li>
                      Inferences from drawn from personal information collected
                    </li>
                  </ul>
                  <p>Personal Information does not include:</p>
                  <ul>
                    <li>
                      Publicly available information from government records.
                    </li>
                    <li>
                      De-identified, anonymized or aggregated consumer
                      information.
                    </li>
                    <li>
                      Information excluded from the CCPA’s scope (e.g.,
                      information covered by the Fair Credit Reporting Act
                      (FRCA), the Gramm-Leach-Bliley Act (GLBA) or California
                      Financial Information Privacy Act (FIPA), and the Driver’s
                      Privacy Protection Act of 1994).
                    </li>
                  </ul>
                  <p class="subtitle" id="sources-for-personal-information">
                    Categories of Sources for Personal Information
                  </p>
                  <p>
                    GoodLeap obtains the Personal Information from the following
                    categories of sources:
                  </p>
                  <ul>
                    <li>
                      Directly from you. For example, from your communications
                      to us and through the forms you complete and information
                      you provide to request our financial products.
                    </li>
                    <li>
                      Indirectly from you. For example, when you navigate
                      through the Systems and such information is collected
                      automatically. Information collected automatically may
                      include usage details, IP addresses and information
                      collected through cookies and other tracking technologies.
                    </li>
                    <li>
                      From third-party sources. For example, consumer reporting
                      agencies to process and approve your loan application, to
                      verify identity, and to offer you financial products and
                      services of interest to you.
                    </li>
                  </ul>
                  <p
                    class="subtitle"
                    id="purposes-for-collection-and-use-of-personal-information"
                  >
                    Purposes for Collection and Use of Personal Information
                  </p>
                  <p>
                    We may use or disclose the Personal Information we collect
                    for one or more of the following business purposes:
                  </p>
                  <ul>
                    <li>
                      To fulfill or meet the reason you provided the
                      information.
                    </li>
                    <li>
                      To provide, support, personalize, and develop our Systems
                      and related services.
                    </li>
                    <li>
                      To create, maintain, customize, and secure your account
                      information and to support everyday operations including
                      risk, legal, and compliance requirements.
                    </li>
                    <li>To prevent transactional fraud.</li>
                    <li>
                      To respond to your customer support requests and/or
                      consumer complaints.
                    </li>
                    <li>
                      To personalize your experience using our Systems and
                      related services to deliver content and offerings of
                      interest to you.
                    </li>
                    <li>
                      To help maintain the safety, security, and integrity of
                      our Systems, services, databases, related technology
                      assets, and our overall business.
                    </li>
                    <li>
                      For testing, research, analysis, and product development,
                      including to develop and improve our business, our Systems
                      and related services.
                    </li>
                    <li>
                      To respond to law enforcement requests and as required by
                      applicable law, court order, or governmental regulations.
                    </li>
                    <li>
                      As described to you when collecting your personal
                      information.
                    </li>
                    <li>
                      To evaluate or conduct a transaction involving some or all
                      of GoodLeap’s business or assets in which such information
                      is among the assets to be included.
                    </li>
                  </ul>
                  <p class="subtitle" id="SharingPersonalInformation">
                    Sharing Personal Information
                  </p>
                  <p>
                    We share your personal information with the following
                    categories of third parties:
                  </p>
                  <ul>
                    <li>
                      Parties involved in the loan application, underwriting,
                      and financing process.
                    </li>
                    <li>Parties who service your account.</li>
                    <li>Parties that perform services on GoodLeap’s behalf.</li>
                    <li>Parties specifically authorized by you.</li>
                    <li>
                      GoodLeap’s financing partners, investors, related agents
                      and advisors.
                    </li>
                    <li>As required by law.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.firstcontent {
  min-height: 29.6875vw;
  display: flex;
  flex-direction: column;
  overflow: visible;
  position: relative;
  padding-top: 0;
  z-index: 3;
  box-sizing: border-box;
}
.firstcontent:before {
  border-left: 2px solid #f1f1f1;
  bottom: 0;
  content: "";
  left: 7.7295vw;
  position: absolute;
  top: 0;
  width: 2px;
  left: 13.8542vw;
}
.firstcontent .HeaderSkewed__Content {
  padding-bottom: 4.16665vw;
  display: flex;
  flex: 1 1;
  margin: 0 auto;
  overflow: visible;
  position: relative;
  width: 100%;
  z-index: 2;
  flex-direction: column;
}
.firstcontent .HeaderContent {
  flex: 1 1;
  pointer-events: all;
  position: relative;
  z-index: 1;
}
.jumbotron-card--white-spaced {
  align-items: center;
  background-color: #fff;
  background-image: none;
  display: flex;
  justify-content: center;
}
@media only screen and (min-width: 64em) {
  .jumbotron-card {
    margin: 1.6667vw auto 0;
    padding: 3.3854vw 4.6875vw 2.3438vw;
    width: 100%;
    height: auto;
    margin-top: 6.6667vw;
    max-width: 51.25vw;
    border-radius: 35px;
  }
}

.firstcontent .HeaderContentTitleCenter__Title {
  margin: 112px 0;
  font-size: 42px;
  color: #fff;
  letter-spacing: -0.84px;
  padding: 0 32px;
  text-align: center;
}
.HeaderContentTitleCenterChildren__Children {
  padding: 0 32px;
}
.jumbotron-card {
  box-shadow: 0 10px 30px 0 rgb(0 0 0 / 20%);
  object-fit: contain;
}
@media only screen and (min-width: 48em) {
  .jumbotron-card--white-spaced p {
    font-size: 20px;
    margin: 0 0 1.7708vw;
  }
}
.jumbotron-card--white-spaced p {
  color: #555;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 1.5;
}
.firstcontent .HeaderSkewed__Background {
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 21.3542vw, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 21.3542vw, 0 100%);
  max-height: 29.6875vw;
  background-color: #555;
  bottom: 0;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  user-select: none;
  z-index: 1;
}
.firstcontent .HeaderSkewed__BackgroundImage--desktop {
  display: block;
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
}

@media only screen and (min-width: 64em){
    .Block--regular-topless {
        padding: 0;
    }
}
.Block {
    background-color: #fff;
    overflow: hidden;
    position: relative;
}
.Block:before {
    bottom: 0;
    content: "";
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
}
.Block__content {
    margin: 0 auto;
    padding: 0;
    position: relative;
    z-index: 2;
}
@media only screen and (min-width: 48em){
    .wrapper--tracking {
    max-width: 67.7083vw;
    }
}
.wrapper--tracking {
    width: 100%;
}
@media only screen and (min-width: 48em){
    .wrapper {
    padding: 0 16px;
    }
}
.wrapper {
    margin: 0 auto;
    position: relative;
}
.content-grid--privacy {
    display: block;
    padding-bottom: 0;
}
@media only screen and (min-width: 48em){
    .content-grid {
    grid-row-gap: 6.6667vw;
    grid: 1fr/repeat(2,1fr);
    padding-top: 5.2083vw;
    }
}
.content-grid {
    align-items: stretch;
    justify-items: stretch;
    margin: 0 auto;
    position: relative;
}
@media only screen and (min-width: 48em){
    .content-grid__block {
        padding: 0 32px;
    }
}
.content-grid__block {
    width: 100%;
}
@media only screen and (min-width: 48em){
    .heading--h3-smaller-bottom {
        margin-bottom: 60px;
        font-size: 36px;
        letter-spacing: -.9px;
        line-height: 1.1;
    }
}
.heading--h3-smaller{
    color: #555;
}
.heading {
    color: #555;
    font-stretch: normal;
    font-weight: 500;
    margin: 0;
    scroll-margin-top: 8vh;
    text-align: left;
    vertical-align: baseline;
}
.heading a {
    color: #4915f8;
}
.heading a span {
    text-decoration: underline;
}
.heading small {
    font-size: 16px;
    font-weight: 100;
    text-decoration: none;
}

@media only screen and (min-width: 64em){
    .Block--regular-topless {
        padding: 0;
    }
}
.content-grid--slim {
    display: block;
    padding-bottom: 32px;
    padding-top: 32px;
}
@media only screen and (min-width: 48em){
    .content-grid {
        grid-row-gap: 6.6667vw;
        grid: 1fr/repeat(2,1fr);
    }
}
@media only screen and (min-width: 48em){
    .heading--h3-static {
        font-size: 45px;
        letter-spacing: -1.2px;
        line-height: 2.1;
    }
}
.heading--h3-static {
    color: #555;
}
@media only screen and (min-width: 48em){
    .rawHtmlStyled--slim {
        margin: 5rem 0 0;
    }
}
.rawHtmlStyled--slim {
    margin: 2rem 0;
}
@media only screen and (min-width: 48em){
    .rawHtmlStyled p, .rawHtmlStyled ul {
        font-size: 1.25rem;
        line-height: 1.5;
        margin: 0 0 2rem;
        padding: 0;
    }
}
.rawHtmlStyled p, .rawHtmlStyled ul {
    color: #555;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
}

</style>