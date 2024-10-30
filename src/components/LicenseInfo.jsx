import React from "react";
import "./LicenseInfo.css";

const LicenseInfo = () => {
  return (
    <div className="license-info">
      <h1 className="license-info__heading-1">License Information</h1>
      <p className="license-info__p-tag">
        Welcome to our Beat Farm License Information page. Here, you'll find
        details on the different license options available for our beats, so you
        can choose the best fit for your project. Please review each option
        carefully to ensure compliance with our terms.
      </p>

      <div className="license-info__section">
        <h2 className="license-info__details-heading">License Types</h2>
        <p className="license-info__p-tag">
          We offer three types of licenses: <strong>Personal</strong>,{" "}
          <strong>Commercial</strong>, and <strong>Exclusive</strong>. Each
          license comes with unique permissions and restrictions, as outlined
          below:
        </p>

        <table className="license-info__table">
          <thead>
            <tr>
              <th>License Type</th>
              <th>Permissions</th>
              <th>Restrictions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Personal License</td>
              <td>
                - Use in personal projects <br />
                - Social media sharing <br />- Non-monetized platforms
              </td>
              <td>
                - No commercial usage <br />
                - No broadcast rights <br />- Cannot be resold or remixed
              </td>
            </tr>
            <tr>
              <td>Commercial License</td>
              <td>
                - Use in monetized projects <br />
                - Streaming platforms (Spotify, Apple Music) <br />- Limited
                broadcast rights
              </td>
              <td>
                - Cannot be resold or remixed <br />- Maximum reach limit
                (100,000 streams)
              </td>
            </tr>
            <tr>
              <td>Exclusive License</td>
              <td>
                - Full ownership rights <br />
                - Unlimited usage in all media <br />- Resale and remix
                permissions
              </td>
              <td>
                - Non-transferable <br />- Subject to resale pricing
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="license-info__details">
        <h2 className="license-info__details-heading">License Details</h2>
        <p className="license-info__details-p-tag">
          <strong>Personal License</strong>: Ideal for hobbyists and personal
          use. This license allows you to use our beats in non-commercial
          projects like personal videos or social media posts that aren’t
          monetized.
        </p>
        <p className="license-info__details-p-tag">
          <strong>Commercial License</strong>: Suitable for small businesses and
          creators. You can use our beats in monetized projects, such as YouTube
          videos, podcasts, and streaming platforms, with some limitations on
          the number of streams.
        </p>
        <p className="license-info__details-p-tag">
          <strong>Exclusive License</strong>: The perfect choice for
          professionals seeking full control over their projects. This license
          grants unlimited usage rights, allowing you to use the beat across all
          media platforms with no restrictions.
        </p>
      </div>
    </div>
  );
};

export default LicenseInfo;
