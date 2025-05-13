import React from 'react';

function SpecsTable({ specs }) {
  if (!specs || Object.keys(specs).length === 0) {
    return <p className="text-muted">No specifications available.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-sm mt-3">
        <tbody>
          {Object.entries(specs).map(([key, value]) => (
            <tr key={key}>
              <th className="text-capitalize w-50">{formatKey(key)}</th>
              <td>{String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatKey(key) {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

export default SpecsTable;
